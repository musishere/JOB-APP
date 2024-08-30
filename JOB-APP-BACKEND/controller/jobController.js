import ErrorHandler from '../middleware/error.js';
import { catchAsyncError } from '../middleware/catchAsyncerror.js';
import { Job } from '../models/jobModels.js';

export const getAllJobs = catchAsyncError(async (req, res, next) => {
   const jobs = await Job.find({ expired: false });

   res.status(200).json({
      success: true,
      jobs,
   });
});

export const postjob = catchAsyncError(async (req, res, next) => {
   const { role } = req.user;

   if (role === 'Job Seeker') {
      return next(new ErrorHandler('Job Seeker can not post a job'), 400);
   }

   const {
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
   } = req.body;

   if (!title || !description || !category || !country || !city || !location) {
      return next(new ErrorHandler('Please provide full job details'), 404);
   }

   if ((!fixedSalary || !salaryFrom) && !salaryTo) {
      return next(
         new ErrorHandler(
            'Please either provide fixed salary or ranged salary',
         ),
         400,
      );
   }

   if (salaryFrom && salaryTo && fixedSalary) {
      return next(
         new ErrorHandler(
            'Can not enter fixed salary and ranged salary together',
         ),
         404,
      );
   }

   const postedBy = req.user._id;

   const jobs = await Job.create({
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      postedBy,
   });

   return res.status(200).json({
      succes: true,
      message: 'Job created successfully',
      jobs,
   });
});

export const getMyJobs = catchAsyncError(async (req, res, next) => {
   const { role } = req.user;

   if (role === 'Job Seeker') {
      return next(
         new ErrorHandler('Job Seeker can not use this resource'),
         400,
      );
   }

   const myJobs = await Job.find({ postedBy: req.user._id });

   return res.status(200).json({
      success: true,
      myJobs,
   });
});

export const updateJobs = catchAsyncError(async (req, res, next) => {
   const { role } = req.user;
   if (role === 'Job Seeker') {
      return next(
         new ErrorHandler(
            'Job Seeker not allowed to access this resource.',
            400,
         ),
      );
   }
   const { id } = req.params;
   let job = await Job.findById(id);
   if (!job) {
      return next(new ErrorHandler('OOPS! Job not found.', 404));
   }
   job = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
   });
   res.status(200).json({
      success: true,
      job,
      message: 'Job Updated!',
   });
});

export const deleteJob = catchAsyncError(async (req, res, next) => {
   const { role } = req.user;

   if (role === 'Job Seeker') {
      return next(new ErrorHandler('Job Seeker can not access this resource'));
   }

   const { id } = req.params;
   const job = await Job.findById(id);
   console.log(job);

   if (!job) {
      return next(
         new ErrorHandler(
            'Job Seeker not allowed to access this resource.',
            400,
         ),
      );
   }

   await Job.deleteOne();

   res.status(200).json({
      succes: true,
      message: 'Job Deleted successfully',
   });
});

export const getSingleJob = catchAsyncError(async (req, res, next) => {
   const { id } = req.params;
   try {
      const job = await Job.findById(id);
      if (!job) {
         return next(new ErrorHandler('Job not found', 404));
      }

      res.status(200).json({
         success: true,
         job,
      });
   } catch (error) {
      return next(new ErrorHandler('Invalid ID/Cast error'), 404);
   }
});
