import express from 'express';
import registerController from '../controllers/registerController.js';
const router = express.Router();
const initApiRouter = (app) => {
	router.post('/login', registerController.login);
	router.post('/signup', registerController.signup);
	return app.use('/api/v1', router);
};

export default initApiRouter;
