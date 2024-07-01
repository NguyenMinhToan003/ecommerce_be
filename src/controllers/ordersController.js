import {
	addOrders,
	getOrdersService,
	getOrderDetailService,
} from '../services/ordersServices';
const addShipping = async (req, res) => {
	try {
		const data = req.body;
		const result = await addOrders(data);
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
const getOrderDetail = async (req, res) => {
	try {
		const { id } = req.query;
		const result = await getOrderDetailService(id);
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
	getOrderDetail,
};
