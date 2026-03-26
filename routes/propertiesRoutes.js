import express from "express";
import { body } from 'express-validator';
import { admin, create, save, getImage, storeImage, edit, saveChanges, delet,changeStatus, show, sendMessage, viewsMessage} from '../controller/propertiesController.js';
import protectRoute from "../middleware/protectRoute.js";
import upload from '../middleware/uploadFile.js';
import indeticarUser from "../middleware/indeticarUser.js";


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
    protectRoute,            
    upload.single('file'),    
    storeImage                
)

router.get('/properties/edit/:id',
    protectRoute,
    edit
)
router.post('/properties/edit/:id',
    protectRoute,
    body('title').notEmpty().withMessage('The title is required'),
    body('description').notEmpty().withMessage('The description cannot be empty'),
    body('tags').isNumeric().withMessage('Please select a category'),
    body('prices').isNumeric().withMessage('Please select a price range'),
    body('bedrooms').isNumeric().withMessage('Select number of bedrooms'),
    body('garage').isNumeric().withMessage('Select number of parking spaces'),
    body('wc').isNumeric().withMessage('Select number of bathrooms'),
    body('lat').notEmpty().withMessage('Please locate the property on the map'),
    saveChanges
)

router.post('/properties/delete/:id',
    protectRoute,
    delet
)

router.put('/properties/:id',
    protectRoute,
    changeStatus
)

// area public

router.get('/properties/:id',
    indeticarUser,
    show
)

// store message

router.post('/properties/:id',
    indeticarUser,
    body('message').notEmpty().withMessage('The message cannot be empty').isLength({ min: 10 }),
    sendMessage
)

router.get('/messages/:id',
    protectRoute,
    viewsMessage
)

export default router;