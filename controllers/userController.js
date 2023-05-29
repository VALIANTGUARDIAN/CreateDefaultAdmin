import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';

// Create a default admin
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

export { createDefaultAdmin };
