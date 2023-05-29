import express from 'express';
import { createDefaultAdmin, signUp } from '../controllers/userController.js';

const router = express.Router();

router.get('/DefaultAdmin', createDefaultAdmin);
router.post('/signup', signUp);

export default router;
