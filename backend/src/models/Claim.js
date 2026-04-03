import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    insuranceId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Record', required: true },
    claimAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'flagged_fraud'], default: 'pending' },
    fraudScore: { type: Number, default: 0 },
    aiNotes: { type: String }
}, { timestamps: true });

const Claim = mongoose.model('Claim', claimSchema);
export default Claim;
