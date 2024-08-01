import catagoryServices from '../services/CatagoryServices';
const getCatagories = async (req, res) => {
	try {
		const result = await catagoryServices.getCatagories();
		return res.status(200).json({
			EM: result.EM,
			EC: result.EC,
			DT: result.DT,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			EM: 'ERROR from server',
			EC: -1,
			DT: '',
		});
	}
};
const getProductByCatagory = async (req, res) => {
	try {
		let id = req.query.id || req.params.id || req.body.id;
		const result = await catagoryServices.getProductByCatagory(id);
		return res.status(200).json({
			EM: result.EM,
			EC: result.EC,
			DT: result.DT,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			EM: 'ERROR from server',
			EC: -1,
			DT: '',
		});
	}
};
module.exports = {
	getCatagories,
	getProductByCatagory,
};
