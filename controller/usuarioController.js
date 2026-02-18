import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';
import { generateJwt, generateToken } from '../helpers/tokens.js'
import { emailRegister, emailforget } from '../helpers/email.js'
import bcrypt from 'bcrypt';


const formLogin = (req, res) => {
    res.render('auth/login', {
        pageName: 'login',
    })
}

const authenticate = async (req, res) => {
    await check('email').isEmail().withMessage('Email address is required').run(req)
    await check('password').notEmpty().withMessage('Password is required').run(req)
    let result = validationResult(req)
    if (!result.isEmpty()) {
        return res.render('auth/login', {
            pageName: 'Login',
            errors: result.array(),
        })
    }

    const { email, password } = req.body
    const user = await Usuario.findOne({ where: { email } })
    console.log(user);
    if (!user) {
        return res.render('auth/login', {
            pageName: 'Login',
            errors: [{ msg: 'User does not exist' }],
        })
    }
    if (!user.confirm) {
        return res.render('auth/login', {
            pageName: 'Login',
            errors: [{ msg: 'Your account has not been confirmed, check your email' }],
        })
    }

    if (!user.checkPassword(password)) {
        return res.render('auth/login', {
            pageName: 'Login',
            errors: [{ msg: 'Password is incorrect' }],
        })
    }

    const token = generateJwt(user.id)
    console.log(token);
    return res.cookie('_token', token, {
        httpOnly: true,
    }).redirect('/my-properties')
}


const formRegister = (req, res) => {
    res.render('auth/register', {
        pageName: 'Register',
    })
}

const register = async (req, res) => {
    await check('name').notEmpty().withMessage('Name is required').run(req)
    await check('email').isEmail().withMessage('Email is not valid').run(req)
    await check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req)
    await check('repeat_password').equals(req.body.password).withMessage('Passwords do not match').run(req)
    let result = validationResult(req)
    if (!result.isEmpty()) {
        return res.render('auth/register', {
            pageName: 'Register',
            errors: result.array(),
            customer: {
                name: req.body.name,
                email: req.body.email,
            }
        })
    }

    const { name, email, password, repeat_password } = req.body

    const existingUser = await Usuario.findOne({ where: { email } })
    if (existingUser) {
        return res.render('auth/register', {
            pageName: 'Register',
            errors: [{ msg: 'Email already exists' }],
            customer: {
                name: req.body.name,
                email: req.body.email,
            }
        })
    }


    const user = await Usuario.create({
        name,
        email,
        password,
        token: generateToken()
    })

    emailRegister({
        name: user.name,
        email: user.email,
        token: user.token
    })


    res.render('templates/message', {
        page: 'Account created successfully',
        menssage: 'We sent a confirmation message to your email, please confirm your account'
    })

}

const formConfirm = async (req, res) => {
    const { token } = req.params

    const user = await Usuario.findOne({ where: { token } })
    if (!user) {
        return res.render('auth/confirmaccount', {
            page: 'Invalid token',
            menssage: 'There was an error validating your account, try again',
            error: true
        })
    }

    user.token = null
    user.confirm = true
    await user.save();

    return res.render('auth/confirmaccount', {
        page: 'Account confirmed',
        pageName: 'Confirm your account',
        menssage: 'Account confirmed successfully',
        error: false
    })
}



const formForget = (req, res) => {
    res.render('auth/forget-password', {
        pageName: 'Recover your account access',
    })
}

const resetPassword = async (req, res) => {

    await check('email').isEmail().withMessage('Email is not valid').run(req)

    let result = validationResult(req)
    if (!result.isEmpty()) {
        return res.render('auth/forget-password', {
            pageName: 'Recover your account access',
            errors: result.array(),
        })
    }

    const { email } = req.body
    const user = await Usuario.findOne({ where: { email } })
    if (!user) {
        return res.render('auth/forget-password', {
            pageName: 'Recover your account access',
            errors: [{ msg: 'Email does not exist' }],
        })
    }

    user.token = generateToken()
    await user.save()

    emailforget({
        name: user.name,
        email: user.email,
        token: user.token
    })
    res.render('templates/message', {
        page: 'Reset password email sent',
        pageName: 'Recover your account access',
        menssage: 'We sent an email with instructions to reset your password',
    })
}

const checktoken = async (req, res) => {
    const { token } = req.params
    const user = await Usuario.findOne({ where: { token } })
    if (!user) {
        return res.render('auth/confirmaccount', {
            page: 'Invalid token',
            menssage: 'There was an error validating your account, try again',
            error: true
        })
    }
    res.render('auth/reset-password', {
        pageName: 'Reset your password',
        token: user.token
    })
}



const newPassword = async (req, res) => {
    await check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req)
    let result = validationResult(req)
    if (!result.isEmpty()) {
        return res.render('auth/reset-password', {
            pageName: 'Reset your password',
            errors: result.array(),

        })
    }

    const { token } = req.params
    const { password } = req.body
    const user = await Usuario.findOne({ where: { token } })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt);
    user.token = null
    await user.save()

    res.render('auth/confirmaccount', {
        page: 'Password reset successfully',
        pageName: 'Reset your password',
        menssage: 'Your password has been reset successfully, you can now log in with your new password',
    })
}


export {
    formLogin,
    authenticate,
    formRegister,
    register,
    formConfirm,
    formForget,
    resetPassword,
    checktoken,
    newPassword
}
