import jwt from 'jsonwebtoken';

const generateJwt = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })

const generateToken = () => Date.now() + Math.random().toString(32) + Math.random().toString(32).substring(2);

export {
    generateJwt,
    generateToken
}


