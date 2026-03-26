import express from "express";
import { propertiesall } from "../controller/apiController.js";

const router = express.Router()

router.get('/properties', propertiesall)

export default router;