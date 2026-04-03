import mongoose from 'mongoose';

const ledgerSchema = new mongoose.Schema({
    transactionId: { type: String, required: true, unique: true },
    timestamp: { type: Date, default: Date.now },
    action: { type: String, required: true },
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dataHash: { type: String, required: true },
    previousHash: { type: String, required: true }
});

const LedgerLog = mongoose.model('LedgerLog', ledgerSchema);
export default LedgerLog;
