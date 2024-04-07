import express from 'express';
import path from 'path';

const configExpress = (app) => {
	app.use(express.static('./src/public'));
	app.use('/assets', express.static(path.join(__dirname, '../assets')));
	app.set('view engine', 'ejs');
	app.set('views', './src/views');
};
export default configExpress;
