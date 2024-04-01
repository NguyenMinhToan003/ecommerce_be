import express from 'express';
const router = express.Router();
const initApiRouter = (app) => {
	router.get('/test', (req, res) => {
		return res.send('Hello World');
	});
	return app.use('/api/v1', router);
};

export default initApiRouter;
