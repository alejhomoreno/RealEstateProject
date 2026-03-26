import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const indeticarUser = async (req, res, next) => {

    const {_token} = req.cookies

    console.log("TOKEN FOUND?:", _token ? "Yes" : "No");

    if (!_token) {
        req.user = null
        return next()
    }   

    try {
        const decoded = jwt.verify(_token, process.env.JWT_SECRET)
        console.log("DECODED JWT ID:", decoded.id); // CHECK 2
        const user = await Usuario.scope('deletePassword').findByPk(decoded.id)

        if (user) {
            console.log("USER FOUND IN DB:", user.name);
            req.user = user
            
        }
        return next()
    } catch (error) {
        console.log(error)
        console.log("JWT ERROR:", error.message);
        return res.clearCookie('_token').redirect('/auth/login')
    }
}

export default indeticarUser