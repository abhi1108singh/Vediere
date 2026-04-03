import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    diagnosis: { type: String, required: true },
    treatmentDetails: { type: String, required: true },
    prescription: { type: String },
    // Sensitive data stored in encrypted format
    encryptedData: { type: String },
    // Blockchain integration hash references
    blockchainAuditHash: { type: String }
}, { timestamps: true });

const Record = mongoose.model('Record', recordSchema);
export default Record;
