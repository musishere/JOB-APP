import ErrorHandler from '../middleware/error.js';
import { catchAsyncError } from '../middleware/catchAsyncerror.js';
import { User } from '../models/userModel.js';
import { sendToken } from '../utils/jwtToken.js';

export const registerUser = catchAsyncError(async (req, res, next) => {
   const { name, email, password, phone, role } = req.body;

   if (!name || !email || !password || !phone || !role) {
      return next(new ErrorHandler('Please fill all fields!'));
   }

   const existingEmail = await User.findOne({ email });

   if (existingEmail) {
      return next(new ErrorHandler('Email already exists!'));
   }

   const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
   });

   sendToken(user, 200, res, 'User registered!');
});

export const loginUser = catchAsyncError(async (req, res, next) => {
   const { email, password, role } = req.body;

   if (!email || !password || !role) {
      return next(new ErrorHandler('Please fill all fields'), 400);
   }

   const user = await User.findOne({ email });
   if (!user) {
      return next(new ErrorHandler('Invalid email or password!'), 400);
   }

   const isPasswordCorrect = await user.comparePassword(password);
   if (!isPasswordCorrect) {
      return next(new ErrorHandler('Invalid email or password!'), 400);
   }

   if (user.role !== role) {
      return next(new ErrorHandler('User with this role not found.'), 400);
   }

   sendToken(user, 200, res, 'User logged in succesfully');
});

export const logoutUser = catchAsyncError(async (req, res, next) => {
   return res
      .status(200)
      .cookie('token', '', {
         httpOnly: true,
         expires: new Date(Date.now()),
      })
      .json({
         succes: true,
         message: 'User logged out succesfully!',
      });
});

export const getUser = catchAsyncError(async (req, res, next) => {
   const user = req.user;

   res.status(200).json({
      success: true,
      user,
   });
});
