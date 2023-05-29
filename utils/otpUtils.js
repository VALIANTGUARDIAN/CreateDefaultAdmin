import User from '../models/UserModel.js';

const verifyEmailOTP = (email, otp) => {
  // Retrieve the stored OTP for the email (you may need to modify this based on your database structure)
  const storedOTP = retrieveOTPFromDatabase(email);

   if (otp === storedOTP) {
    return true;
  } else {
    return false;
  }
};

const retrieveOTPFromDatabase = async (email) => {
  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });

    // Retrieve the OTP from the user object or user document
    const storedOTP = user.otp;

    return storedOTP;
  } catch (error) {
    console.error('Error retrieving OTP from the database:', error);
    throw error;
  }
};


const generateOTP = () => {
    const otpLength = 6;
    let otp = '';
  
    for (let i = 0; i < otpLength; i++) {
      otp += Math.floor(Math.random() * 10);
    }
  
    return otp;
  };
  
  export { generateOTP, verifyEmailOTP, retrieveOTPFromDatabase };
  