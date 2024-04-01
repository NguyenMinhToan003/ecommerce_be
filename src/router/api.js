import express from 'express';
import registerController from '../controllers/registerController.js';
import test from '../controllers/test.js';
const router = express.Router();
const initApiRouter = (app) => {
	router.get('/test', (req, res) => {
		return res.send('Hello World');
	});
	router.post('/signup', registerController.signup);
	router.get('/roles', test.getRoles);
	return app.use('/api/v1', router);
};

export default initApiRouter;
