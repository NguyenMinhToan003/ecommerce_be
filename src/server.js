require('dotenv').config();
import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connection from './configs/connectMysql2.js';
import configViewEngine from './configs/viewEngine.js';
import initWebRouter from './router/web.js';

const app = Express();

// CORS
// Connection Database
() => connection();
// Config view engine
configViewEngine(app);

// use json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config cooke
app.use(cookieParser());

// Router
initWebRouter(app);
// 404 not found
app.use((req, res) => {
	return res.send('404 not found');
});

// port
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
