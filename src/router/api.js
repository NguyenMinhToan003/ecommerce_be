import express from 'express';
import registerController from '../controllers/registerController.js';
import productionController from '../controllers/productionController.js';
import jwtController from '../controllers/jwtController.js';
import {
	storeImageProduct,
	storeImageUser,
} from '../middlewares/storeImage.js';
import multer from 'multer';
import { checkJWTToken, checkPermission } from '../middlewares/jwtAction.js';
const uploadProduct = multer({ storage: storeImageProduct });
const uploadUser = multer({ storage: storeImageUser });
const router = express.Router();
const initApiRouter = (app) => {
	router.all('*', checkJWTToken, checkPermission);
	router.post('/checkToken', jwtController.accessToken);
	router.post('/login', registerController.login);
	router.post('/logout', registerController.logout);
	router.post('/signup', registerController.signup);
	router.post(
		'/updateAvatar',
		uploadUser.single('avatar'),
		registerController.updateAvatar
	);
	router.post(
		'/uploadProduct',
		uploadProduct.any('files', 5),
		productionController.upLoadProduction
	);
	router.get('/getProduct', productionController.getProduction);
	router.post('/deleteProduct', productionController.deleteProduction);
	router.post('/updateProduct', productionController.updateProduction);
	return app.use('/api/v1', router);
};

export default initApiRouter;
