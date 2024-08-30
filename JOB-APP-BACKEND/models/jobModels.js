import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, 'Please provide job title'],
      minLength: [3, 'Job title must contain atleast 3 characters'],
      maxLength: [50, 'Job title can not exceed 50 characters'],
   },
   description: {
      type: String,
      required: [true, 'Please provide job description'],
      minLength: [3, 'Job description must contain atleast 3 characters'],
      maxLength: [350, 'Job description can not exceed 50 characters'],
   },
   category: {
      type: String,
      required: [true, 'Please provide job category'],
   },
   country: {
      type: String,
      required: [true, 'Please provide country'],
   },
   city: {
      type: String,
      required: [true, 'Job city is required'],
   },
   location: {
      type: String,
      required: [true, 'Please provide exact location'],
      minLength: [10, 'Job location must contain atleast 50 characters'],
   },
   fixedSalary: {
      type: Number,
      minLength: [4, 'Fixed salary must contains atleast 4 digits'],
      maxLengh: [9, 'Fixed salary cannot exceed 9 digits'],
   },
   salaryFrom: {
      type: Number,
      minLength: [4, 'Salary from must contains atleast 4 digits'],
      maxLengh: [9, 'Fixed from cannot exceed 9 digits'],
   },
   salaryTo: {
      type: Number,
      minLength: [4, 'SalaryTo must contains atleast 4 digits'],
      maxLengh: [9, 'SalaryTo from cannot exceed 9 digits'],
   },
   expired: {
      type: Boolean,
      default: false,
   },
   jobPostedOn: {
      type: Date,
      default: Date.now,
   },
   postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
   },
});

export const Job = mongoose.model('Job', jobSchema);
