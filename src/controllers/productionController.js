require('dotenv').config();
import {
	upLoadtProduct,
	getProductService,
	deleteProduct,
	updateProduct,
	searchProductService,
	detailProductService,
} from '../services/productService';
const getProduction = async (req, res) => {
	try {
		let { limit, page } = req.query;
		if (page === 0) page = 1;
		if (limit === 0) limit = 10;

		const result = await getProductService({ limit, page });
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

const upLoadProduction = async (req, res) => {
	try {
		let data = req.body;
		const files = req.files;
		let url = '';
		files.forEach((item, index) => {
			url = url + `${process.env.STORE_PRODUCT}${item.filename},`;
		});

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
const deleteProduction = async (req, res) => {
	try {
		const { id } = req.body;
		const result = await deleteProduct(id);
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
const updateProduction = async (req, res) => {
	try {
		const { product } = req.body;
		const result = await updateProduct(product);
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

const searchProduction = async (req, res) => {
	try {
		const { name, limit, page } = req.query;
		console.log(name, limit, page);
		const result = await searchProductService(name, limit, page);
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
const detailProduction = async (req, res) => {
	try {
		const { id } = req.query;
		console.log(id);
		const result = await detailProductService(id);
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
module.exports = {
	upLoadProduction,
	getProduction,
	deleteProduction,
	updateProduction,
	searchProduction,
	detailProduction,
};
