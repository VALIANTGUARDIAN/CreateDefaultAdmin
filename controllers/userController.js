import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';
import { sendMail } from '../utils/emailUtils.js';
import { generateOTP } from '../utils/otpUtils.js';


// Creating default admin
const createDefaultAdmin = async () => {
  try {
    // Check if the default admin already exists
    const isAdminExists = await User.exists({ userType: 'ADMIN' });
    if (isAdminExists) {
      console.log('Default admin already exists.');
    } else {
      // Create the default admin
      const adminData = {
        firstname: 'Digvijay',
        lastname: 'Singh',
        email: 'digvijay@mailinator.com',
        mobilenumber: '9876543210',
        countrycode: '+91',
        username: 'valiantguardian',
        password: await bcrypt.hash('Qwerty@123', 10), 
        address: 'D-115, Poket D, Okhla Phase 1',
        dob: new Date('10-02-1998'),
        status: 'ACTIVE',
        userType: 'ADMIN',
      };

      const admin = await User.create(adminData);
      console.log('Default admin created:', admin);
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};


// Sign up function
const signUp = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      mobilenumber,
      password,
      address,
      dob,
    } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { userName: generateUserName(firstname, mobilenumber) }, { mobilenumber }],
    });
    if (existingUser) {
      return res.status(409).json({ message: 'User with the same email, username, or mobile number already exists' });
    }

    const otp = generateOTP();

    const user = new User({
      firstName,
      lastName,
      email,
      mobileNumber,
      userName: generateUserName(firstname, mobilenumber),
      password: await bcrypt.hash(password, 10),
      address,
      dateOfBirth,
      userType: 'USER',
    });

    await user.save();


    const emailSubject = 'OTP for Sign Up';
    const emailBody = `Your OTP for sign up is: ${otp}`;
    await sendMail(email, subject, text);

    res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'An error occurred during sign up' });
  }
};

// Generate username using firstName and mobileNumber's last 4 digits
const generateUserName = (firstname, mobilenumber) => {
  const lastFourDigits = mobilenumber.slice(-4);
  return `${firstname.toLowerCase()}${lastFourDigits}`;
};


export { createDefaultAdmin, signUp };
