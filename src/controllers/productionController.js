require('dotenv').config();
import { upLoadtProduct } from '../services/productService';
const upLoadProduction = async (req, res) => {
	try {
		let data = req.body;
		const files = req.files;
		let url = '';
		files.forEach((item, index) => {
			url = url + `${process.env.STORE_PRODUCT}${item.filename},`;
		});
		console.log(data.name);
		data = { ...data, url: url };
		const result = await upLoadtProduct(data);
		return res.status(200).json({
			EM: result.EM,
			EC: result.EC,
			DT: result.DT,
		});
	} catch (error) {
		console.log(error);
		return res.stastus(500).json({ EM: 'ERROR from server', EC: -1, DT: '' });
	}
};
module.exports = { upLoadProduction };
