import multer from 'multer'
import path from 'path'
import { generateToken } from '../helpers/tokens.js'

const storage = multer.diskStorage({
    destination:function (req, file, cb){
        cb(null,'./public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,generateToken() + path.extname(file.originalname))
    }   
})

const upload = multer({ storage})

export default upload;  