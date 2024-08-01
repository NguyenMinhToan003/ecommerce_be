import db from '../models';

const getCatagories = async (req, res) => {
	try {
		const result = await db.Categories.findAll();

		return {
			EM: 'get Catagories success',
			EC: 0,
			DT: result,
		};
	} catch (e) {
		console.log(e);
		return {
			EM: 'ERROR from server',
			EC: -1,
			DT: '',
		};
	}
};
const getProductByCatagory = async (id) => {
	try {
		console.log(id);
		const result = await db.Products.findAll({
			where: {
				categoryID: id,
			},
		});
		return {
			EM: 'get Product by Catagory success',
			EC: 0,
			DT: result,
		};
	} catch (e) {
		console.log(e);
		return {
			EM: 'ERROR from server',
			EC: -1,
			DT: '',
		};
	}
};

module.exports = {
	getCatagories,
	getProductByCatagory,
};
