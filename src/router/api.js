import express from 'express';
import registerController from '../controllers/registerController.js';
import productionController from '../controllers/productionController.js';
import jwtController from '../controllers/jwtController.js';
import userController from '../controllers/userController.js';
import ordersController from '../controllers/ordersController.js';
import {
	storeImageProduct,
	storeImageUser,
} from '../middlewares/storeImage.js';
import { refreshToken } from '../middlewares/jwtAction.js';
import multer from 'multer';
import { checkJWTToken, checkPermission } from '../middlewares/jwtAction.js';
const uploadProduct = multer({ storage: storeImageProduct });
const uploadUser = multer({ storage: storeImageUser });
const router = express.Router();
const initApiRouter = (app) => {
	router.all('*', checkJWTToken, checkPermission);
	router.post('/accessToken', jwtController.accessToken);
	router.post('/refreshToken', refreshToken, jwtController.accessToken);
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
	router.get('/getListUser', userController.getListUser);
	router.get('/detailProduct', productionController.detailProduction);
	router.get('/getProduct', productionController.getProduction);
	router.post('/deleteProduct', productionController.deleteProduction);
	router.post('/updateProduct', productionController.updateProduction);
	router.get('/search', productionController.searchProduction);
	router.post('/shipping', ordersController.addShipping);
	router.get('/getOrders', ordersController.getOrders);
	router.get('/getOrderDetail', ordersController.getOrderDetail);
	return app.use('/api/v1', router);
};

export default initApiRouter;
