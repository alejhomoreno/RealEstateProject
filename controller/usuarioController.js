import {check, validationResult}from 'express-validator';
import Usuario from '../models/Usuario.js';

const formLogin = (req, res) => {
    res.render('auth/login',{
        pageName: 'login',
    })
}

const formRegister = (req, res) => {
    res.render('auth/register',{
     pageName: 'Register',
    })
}

const register = async (req, res) => {  
    await check('name').notEmpty().withMessage('Name is required').run(req)
    await check('email').isEmail().withMessage('Email is not valid').run(req)
    await check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters').run(req)
    await check('repeat_password').equals('password').withMessage('Passwords do not match').run(req)
    let result = validationResult(req) 
    if(!result.isEmpty()) {
        return res.render('auth/register',{
                 pageName: 'Register',
                    errors: result.array()
        })
    }
 
    const customer = await Usuario.create(req.body)
    res.json(customer)
}

const formForget = (req, res) => {
    res.render('auth/forget-password',{
     pageName: 'Recover your account access',
    })
}

export {
    formLogin, 
    formRegister,
    register,
    formForget
}