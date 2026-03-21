import jwt from 'jsonwebtoken'
import { Usuario } from '../models/index.js'

const protectRoute = async (req,res,next)=>{
    console.log('from middleware')
    const {_token} = req.cookies
    if(!_token){
        return res.redirect('/auth/login')
    }
    try {
        const decoded = jwt.verify(_token, process.env.JWT_SECRET)
        const client = await Usuario.scope('deletePassword').findByPk(decoded.id)
        console.log(client)
        if(client) {
            req.client = client
        }else {
            return res.redirect('/auth/login')
        }


    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login')
    }
    next();
}
export default protectRoute