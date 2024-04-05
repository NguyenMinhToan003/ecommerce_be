import express from 'express';
import registerController from '../controllers/registerController.js';
import productionController from '../controllers/productionController.js';
import {
	storeImageProduct,
	storeImageUser,
} from '../middlewares/storeImage.js';
import multer from 'multer';
const uploadProduct = multer({ storage: storeImageProduct });
const uploadUser = multer({ storage: storeImageUser });
const router = express.Router();
const initApiRouter = (app) => {
	router.post('/login', registerController.login);
	router.post('/signup', registerController.signup);
	router.post('/addProduct', registerController.addProduct);
	router.post(
		'/uploadProduct',
		uploadProduct.any('image', 5),
		productionController.upLoadProduction
	);

	return app.use('/api/v1', router);
};

export default initApiRouter;
