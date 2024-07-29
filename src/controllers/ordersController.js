import {
	addOrders,
	getOrdersService,
	getOrderDetailService,
} from '../services/ordersServices';
import { getDataUser } from '../services/userService';
import registerService from '../services/registerService';
import { generateOrderEmailTemplate } from '../utils/emailTemplateOrders';

const addShipping = async (req, res) => {
	try {
		const data = req.body;
		const result = await addOrders(data);

		if (result.EC === 0) {
			const emailSubject = 'Confirmation of Order';
			const user = await getDataUser(data.userID);

			if (user.EC !== 0) {
				return res.status(500).json({
					EM: 'ERROR from server',
					EC: -1,
					DT: '',
				});
			}

			const emailBody = generateOrderEmailTemplate(
				result.DT,
				data.products,
				user.DT
			);
			const sentMail = await registerService.autoSendEmail(
				user.DT.email,
				emailSubject,
				emailBody
			);

			if (!sentMail) {
				return res.status(500).json({
					EM: 'ERROR sending email',
					EC: -1,
					DT: '',
				});
			}
		}

		return res.status(200).json({
			EM: result.EM,
			EC: result.EC,
			DT: result.DT,
		});
	} catch (error) {
		console.error('Error in adding shipping:', error);
		return res.status(500).json({ EM: 'ERROR from server', EC: -1, DT: '' });
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
		console.error('Error in getting orders:', error);
		return res.status(500).json({ EM: 'ERROR from server', EC: -1, DT: '' });
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
		console.error('Error in getting order detail:', error);
		return res.status(500).json({ EM: 'ERROR from server', EC: -1, DT: '' });
	}
};

module.exports = {
	addShipping,
	getOrders,
	getOrderDetail,
};
