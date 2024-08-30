import ErrorHandler from './error.js';
import { default as jwt } from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { catchAsyncError } from './catchAsyncerror.js';

export const isAutherized = catchAsyncError(async (req, res, next) => {
   const { token } = req.cookies;

   if (!token) {
      return next(new ErrorHandler('User not autherized', 400));
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

   req.user = await User.findById(decoded.id);

   next();
});
