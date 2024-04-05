import multer from 'multer';
import path from 'path';
const storeImageProduct = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../assets/images/products'));
	},

	filename: (req, file, cb) => {
		cb(null, 'product-' + Date.now() + path.extname(file.originalname));
	},
});
const storeImageUser = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../assets/images/users'));
	},

	filename: (req, file, cb) => {
		cb(null, 'avatar-' + Date.now() + path.extname(file.originalname));
	},
});

module.exports = { storeImageProduct, storeImageUser };
