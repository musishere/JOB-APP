import express from 'express';
import { isAutherized } from '../middleware/Auth.js';

import {
   deleteJob,
   getAllJobs,
   getMyJobs,
   postjob,
   updateJobs,
} from '../controller/jobController.js';

const router = express.Router();

// http://localhost:5000/api/v1/job/getall
router.get('/getall', getAllJobs);

// http://localhost:5000/api/v1/job/post
router.post('/post', isAutherized, postjob);

// http://localhost:5000/api/v1/job/getmyjobs
router.get('/getmyjobs', isAutherized, getMyJobs);

// http://localhost:5000/api/v1/job/update/:id
router.put('/update/:id', isAutherized, updateJobs);

// http://localhost:5000/api/v1/job/update/:id
router.delete('/delete/:id', isAutherized, deleteJob);

export default router;
