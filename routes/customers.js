import express from 'express';
import { formLogin, formRegister } from '../controller/usuarioController.js'

const router = express.Router();

// Routing

router.get('/login', formLogin);
router.get('/register', formRegister );

export default router;