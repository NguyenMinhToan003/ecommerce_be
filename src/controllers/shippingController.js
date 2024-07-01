import {
	addShippingService,
	getOrdersService,
} from '../services/shippingService';
const addShipping = async (req, res) => {
	try {
		const data = req.body;
		const result = await addShippingService(data);
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
const getOrders = async (req, res) => {
	try {
		const { limit, page } = req.query;

		const result = await getOrdersService(limit, page);
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
	addShipping,
	getOrders,
};
