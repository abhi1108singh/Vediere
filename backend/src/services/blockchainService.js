import crypto from 'crypto';
import LedgerLog from '../models/LedgerLog.js';

const generateHash = (data, previousHash) => {
    return crypto.createHash('sha256').update(JSON.stringify(data) + previousHash).digest('hex');
};

export const appendToLedger = async (action, actorId, data) => {
    // Retrieve the most recent block's hash
    const lastLog = await LedgerLog.findOne().sort({ timestamp: -1 });
    const previousHash = lastLog ? lastLog.dataHash : '0000000000000000000000000000000000000000000000000000000000000000'; // Genesis

    const dataHash = generateHash(data, previousHash);
    const transactionId = crypto.randomUUID();

    const newLog = await LedgerLog.create({
        transactionId,
        action,
        actorId,
        dataHash,
        previousHash
    });

    return newLog;
};

export const verifyLedgerIntegrity = async () => {
    const logs = await LedgerLog.find().sort({ timestamp: 1 });
    for (let i = 1; i < logs.length; i++) {
        if (logs[i].previousHash !== logs[i - 1].dataHash) {
            return false; // Chain broken - tampering detected
        }
    }
    return true; // Chain is intact
};
