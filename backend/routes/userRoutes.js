import express from 'express';
import { registerUser, loginUser } from '../controller/userController.js';

const router = express.Router();

// POST request to /api/users/register
router.post('/register', registerUser);

// POST request to /api/users/login
router.post('/login', loginUser);

export default router;