import mongoose from 'mongoose';
import validator from 'validator';

const applicationSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minLength: [3, 'Name must contain atleast 3 characters'],
      maxLength: [30, 'Name can not exceed 30 characters'],
   },
   email: {
      type: String,
      validator: [validator.isEmail, 'Please enter valid email'],
      required: [true, 'Please provide your email'],
   },
   coverLetter: {
      type: String,
      required: [true, 'Please provide your cover letter'],
   },
   phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
   },
   address: {
      type: String,
      required: [true, 'Please provide your address'],
   },
   resume: {
      public_id: {
         type: String,
         required: true,
      },
      url: {
         type: String,
         required: true,
      },
   },

   applicantId: {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
      },
      role: {
         type: String,
         enum: ['Job Seeker'],
         required: true,
      },
   },

   employerId: {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
      },
      role: {
         type: String,
         enum: ['Employer'],
         required: true,
      },
   },
});

export const Application = mongoose.model('Application', applicationSchema);
