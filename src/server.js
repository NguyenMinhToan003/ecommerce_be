require('dotenv').config();
import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import configExpress from './config/configExpress.js';
import initWebRouter from './router/web.js';
import initApiRouter from './router/api.js';
import cors from './config/cors.js';
const app = Express();
// CORS
cors(app);
// Connection Database
/// ORM: Object Relational Mapping
// Config
configExpress(app);

// use json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config cooke
app.use(cookieParser());

// Router
initWebRouter(app);
initApiRouter(app);
// 404 not found
app.use((req, res) => {
	return res.send('404 not found');
});

// port
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
