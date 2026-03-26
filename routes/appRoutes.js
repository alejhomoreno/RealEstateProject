import express from 'express'
import { home, getPropertiesByTag, page404, search} from '../controller/appController.js';

const router = express.Router();

// home page
router.get("/", home);

// tags
router.get('/tags/:id', getPropertiesByTag);

// page 404
router.get("/404", page404);

// search
router.post("/search", search);


export default router;