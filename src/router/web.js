import express from 'express';
const router = express.Router();

const initWebRouter = (app) => {
	router.get('/', (req, res) => {
		res.send('Hello World!');
	});
	return app.use('/', router);
};
export default initWebRouter;
