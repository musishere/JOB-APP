import ErrorHandler from '../middleware/error.js';
import { v2 as cloudinary } from 'cloudinary';
import { catchAsyncError } from '../middleware/catchAsyncerror.js';
import { Application } from '../models/applicationModel.js';
import { Job } from '../models/jobModels.js';

export const employerGetAllApplications = catchAsyncError(
   async (req, res, next) => {
      const { role } = req.user;

      if (role === 'Job Seeker') {
         return next(
            new ErrorHandler('Job Seeker can not access this resource'),
            404,
         );
      }

      const { _id } = req.user;

      const applications = await Application.find({ 'employerId.user': _id });

      res.status(200).json({
         success: true,
         applications,
      });
   },
);

export const jobSeekerGetAllApplications = catchAsyncError(
   async (req, res, next) => {
      const { role } = req.user;

      if (role === 'Employer') {
         return next(
            new ErrorHandler('Employer can not access this resource'),
            404,
         );
      }

      const { _id } = req.user;

      const applications = await Application.find({ 'applicantId.user': _id });

      res.status(200).json({
         success: true,
         applications,
      });
   },
);

export const jobSeekerDeleteApllication = catchAsyncError(
   async (req, res, next) => {
      const { role } = req.user;

      if (role === 'Employer') {
         return next(
            new ErrorHandler('Employer can not access this resource'),
            404,
         );
      }

      const { id } = req.params;
      const application = await Application.findById(id);

      if (!application) {
         return next(new ErrorHandler('Oops, Aplication not found'), 404);
      }

      await Application.deleteOne();

      res.status(200).json({
         success: true,
         message: 'Application deleted sucessfully',
      });
   },
);

export const postApplication = catchAsyncError(async (req, res, next) => {
   const { role } = req.user;
   if (role === 'Employer') {
      return next(
         new ErrorHandler('Employer cannot access this resource'),
         400,
      );
   }

   const { resume } = req.files;
   if (!resume) {
      return next(new ErrorHandler('Resume file required'), 404);
   }

   const allowedFormats = ['image/png', 'image/jpeg', 'image/webp'];
   if (!allowedFormats.includes(resume.mimetype)) {
      return next(
         new ErrorHandler(
            'Invalid file type. Please upload resume in JPG, PNG, or WEBP format',
         ),
         400,
      );
   }

   let cloudinaryResponse;
   try {
      cloudinaryResponse = await cloudinary.uploader.upload(
         resume.tempFilePath,
      );
   } catch (error) {
      console.error('Cloudinary upload error:', error);
      return next(new ErrorHandler('Failed to upload resume'), 500);
   }

   // Check for errors in Cloudinary response
   if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
         'Cloudinary response error:',
         cloudinaryResponse.error ||
            'Something went wrong while uploading resume',
      );
      return next(new ErrorHandler('Failed to upload resume'), 500);
   }

   // Extract applicant details from request body
   const { email, name, coverLetter, phone, address, jobId } = req.body;

   // Validate required fields
   if (!name || !email || !coverLetter || !phone || !address) {
      return next(new ErrorHandler('Please fulfill all fields'), 400);
   }

   // Check if jobId is provided and valid
   if (!jobId) {
      return next(new ErrorHandler('Job not found'), 404);
   }

   const jobDetails = await Job.findById(jobId);
   if (!jobDetails) {
      return next(new ErrorHandler('Job not found'), 404);
   }

   // Define employerId and applicantId
   const employerId = {
      user: jobDetails.postedBy,
      role: 'Employer',
   };
   const applicantId = {
      user: req.user._id,
      role: 'Job Seeker',
   };

   // Create application
   const application = await Application.create({
      email,
      name,
      coverLetter,
      phone,
      address,
      employerId,
      applicantId,
      resume: {
         public_id: cloudinaryResponse.public_id,
         url: cloudinaryResponse.secure_url,
      },
   });

   // Respond with success message
   return res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      application,
   });
});
