import express from "express"
import { body } from 'express-validator'
import { admin, create, save} from '../controller/propertiesController.js'

const router = express.Router()

router.get('/my-properties', admin)
router.get('/properties/create', create)
router.post('/properties/create',
    body('title').notEmpty().withMessage('The title is required'),
    save)

export default router