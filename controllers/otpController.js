import User from '../models/UserModel.js';
import { verifyEmailOTP, generateOTP, retrieveOTPFromDatabase } from '../utils/otpUtils.js';
import { sendMail } from '../utils/emailUtils.js';

// OTP verification function
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the OTP
    const isOTPValid = verifyEmailOTP(email, otp);

    if (!isOTPValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Update the user's OTP verification status
    user.isOTPVerified = true;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'An error occurred during OTP verification' });
  }
};

// Resend OTP function
const resendOTP = async (req, res) => {
  try {
    const { email, mobileNumber } = req.body;

    // Find the user by email or mobile number
    const user = await User.findOne({ $or: [{ email }, { mobileNumber }] });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new OTP
    const otp = generateOTP();

    // Update the user's OTP in the database
    user.otp = otp;
    await user.save();

    // Send the OTP to the user's email
    const emailSubject = 'OTP for Sign Up';
    const emailBody = `Your OTP for sign up is: ${otp}`;
    await sendMail(user.email, emailSubject, emailBody);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error resending OTP:', error);
    res.status(500).json({ message: 'An error occurred while resending OTP' });
  }
};

export { verifyOTP, resendOTP };
