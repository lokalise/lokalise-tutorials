import { Router } from 'express';
import { getHomePage } from '../controllers/homeController.js';
import { changeLanguage } from '../controllers/languageController.js';  // Import the new controller

const router = Router();

router.get('/', getHomePage);
router.get('/change-language', changeLanguage);  // Use the extracted controller function

export default router;
