require('dotenv').config();
const cors = (app) => {
	app.use(function (req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', process.env.URL_FRONTEND);
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Content-Type, Authorization'
		);
		next();
	});
};

export default cors;
