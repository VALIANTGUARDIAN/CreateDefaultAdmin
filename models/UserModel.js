import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
          return emailRegex.test(value);
        },
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: true,
    },
    countrycode: {
      type: String,
      required: true,
    },
    mobilenumber: {
      type: Number,
      unique: true,
      min: 1000000000,
      max: 999999999999,
    },
    address: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'BLOCK', 'DELETE'],
      default: 'ACTIVE',
    },
    userType: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
    otp: {
      type: String,
      required: true,
    },
    otpExpiration: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
