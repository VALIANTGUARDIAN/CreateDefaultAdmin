import express from 'express';
import { verifyOTP, resendOTP } from '../controllers/otpController.js';

const router = express.Router();

router.put('/verify', verifyOTP);
router.put('/resend', resendOTP);

export default router;
