import Claim from '../models/Claim.js';

export const evaluateClaim = async (claimData) => {
    let fraudScore = 0;
    let notes = [];

    // Rule 1: Duplicate claims in 30 days
    const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
    const duplicateClaims = await Claim.find({
        patientId: claimData.patientId,
        claimAmount: claimData.claimAmount,
        createdAt: { $gte: thirtyDaysAgo }
    });

    if (duplicateClaims.length > 0) {
        fraudScore += 80;
        notes.push("High risk: Identical claim amount submitted for this patient within 30 days.");
    }

    // Rule 2: Unusually high claim amount
    if (claimData.claimAmount > 50000) {
        fraudScore += 40;
        notes.push("Medium risk: Unusually high claim amount for standard procedure.");
    }

    // Automatic flag thresholds
    let status = 'pending';
    if (fraudScore >= 80) {
        status = 'flagged_fraud';
    } else if (fraudScore < 30) {
        status = 'approved';
    }

    return {
        fraudScore,
        aiNotes: notes.join(' | '),
        recommendedStatus: status
    };
};
