import Claim from '../models/Claim.js';
import { evaluateClaim } from '../services/fraudDetectionEngine.js';
import { appendToLedger } from '../services/blockchainService.js';

// @desc    Submit Claim
// @route   POST /api/claims
export const submitClaim = async (req, res) => {
    try {
        const { patientId, insuranceId, recordId, claimAmount } = req.body;

        const evaluation = await evaluateClaim({ patientId, claimAmount });

        const claim = await Claim.create({
            patientId,
            hospitalId: req.user._id,
            insuranceId,
            recordId,
            claimAmount,
            status: evaluation.recommendedStatus,
            fraudScore: evaluation.fraudScore,
            aiNotes: evaluation.aiNotes
        });

        // Write to tamper-proof ledger
        await appendToLedger('SUBMIT_CLAIM', req.user._id, { claimId: claim._id, amount: claimAmount });

        res.status(201).json(claim);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Claims specific to user logic
// @route   GET /api/claims
export const getClaims = async (req, res) => {
    try {
        const filter = {};
        if (req.user.role === 'patient') filter.patientId = req.user._id;
        if (req.user.role === 'hospital' || req.user.role === 'doctor') filter.hospitalId = req.user._id;
        if (req.user.role === 'insurance') filter.insuranceId = req.user._id;

        const claims = await Claim.find(filter).populate('patientId', 'name email');
        res.json(claims);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Claim Status (Insurance Verify)
// @route   PUT /api/claims/:id/status
export const updateClaimStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const claim = await Claim.findById(req.params.id);

        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }

        claim.status = status;
        await claim.save();

        // Log Verification to immutable chain
        await appendToLedger('VERIFY_CLAIM', req.user._id, { claimId: claim._id, newStatus: status });

        res.json(claim);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
