import express from 'express';
import { isAutherized } from '../middleware/Auth.js';

import {
   getUser,
   loginUser,
   logoutUser,
   registerUser,
} from '../controller/userController.js';

const router = express.Router();

// http://localhost:5000/api/v1/user/register
router.post('/register', registerUser);

// http://localhost:5000/api/v1/user/login
router.post('/login', loginUser);

// http://localhost:5000/api/v1/user/logout
router.get('/logout', isAutherized, logoutUser);

router.get('/getuser', isAutherized, getUser);

export default router;
