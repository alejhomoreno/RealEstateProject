import express from 'express';
import { formLogin, formRegister,register, formForget } from '../controller/usuarioController.js'

const router = express.Router();

// Routing

router.get('/login', formLogin);

router.get('/register', formRegister )
router.post('/register', register )

router.get('/forget-password', formForget);

export default router;