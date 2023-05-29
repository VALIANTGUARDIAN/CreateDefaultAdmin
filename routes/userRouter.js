import express from 'express';
import { createDefaultAdmin } from '../controllers/userController.js';

const router = express.Router();

router.get('/DefaultAdmin', createDefaultAdmin);

export default router;
