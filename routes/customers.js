import express from 'express';
import { formLogin, authenticate, formRegister, register, formForget, formConfirm, resetPassword, checktoken, newPassword} from '../controller/usuarioController.js'

const router = express.Router();

// Routing

router.get('/login', formLogin);
router.post('/login', authenticate);

router.get('/register', formRegister)
router.post('/register', register)

router.get('/confirm/:token', formConfirm)

router.get('/forget-password', formForget);
router.post('/forget-password', resetPassword);

router.get('/reset-password/:token', checktoken);
router.post('/reset-password/:token', newPassword);

export default router;