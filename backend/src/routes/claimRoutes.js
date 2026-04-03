import express from 'express';
import { submitClaim, getClaims, updateClaimStatus } from '../controllers/claimController.js';
import { protect, roleCheck } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, roleCheck('hospital', 'doctor'), submitClaim)
    .get(protect, getClaims);

router.route('/:id/status')
    .put(protect, updateClaimStatus);

export default router;
