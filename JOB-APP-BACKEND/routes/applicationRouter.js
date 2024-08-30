import express from 'express';
import { isAutherized } from '../middleware/Auth.js';

import {
   employerGetAllApplications,
   jobSeekerDeleteApllication,
   jobSeekerGetAllApplications,
   postApplication,
} from '../controller/applicationController.js';

const router = express.Router();

// http://localhost:5000/api/v1/application/jobseeker/getall
router.get('/jobseeker/getall', isAutherized, jobSeekerGetAllApplications);

// http://localhost:5000/api/v1/application/employer/getall
router.get('/employer/getall', isAutherized, employerGetAllApplications);

// http://localhost:5000/api/v1/application/delete:id
router.delete('/delete:id', isAutherized, jobSeekerDeleteApllication);

// http://localhost:5000/api/v1/application/post
router.post('/post', isAutherized, postApplication);

export default router;
