import express from "express";
import { body } from 'express-validator';
import { admin, create, save, getImage, storeImage } from '../controller/propertiesController.js';
import protectRoute from "../middleware/protectRoute.js";
import upload from '../middleware/uploadFile.js';

const router = express.Router();


router.get('/properties', protectRoute, admin);

router.get('/properties/create', protectRoute, create);

router.post('/properties/create',
    protectRoute,
    body('title').notEmpty().withMessage('The title is required'),
    body('description').notEmpty().withMessage('The description cannot be empty'),
    body('tags').isNumeric().withMessage('Please select a category'),
    body('prices').isNumeric().withMessage('Please select a price range'),
    body('bedrooms').isNumeric().withMessage('Select number of bedrooms'),
    body('garage').isNumeric().withMessage('Select number of parking spaces'),
    body('wc').isNumeric().withMessage('Select number of bathrooms'),
    body('lat').notEmpty().withMessage('Please locate the property on the map'),
    save
);

router.get('/properties/get-image/:id',
    protectRoute,
    getImage
)

router.post('/properties/get-image/:id',
    protectRoute,             // Keep it secure!
    upload.single('file'),    // Dropzone sends it as 'file' by default
    storeImage                // Run the controller to save it to MySQL!
)
export default router;