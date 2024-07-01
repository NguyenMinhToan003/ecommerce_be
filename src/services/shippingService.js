import db from '../models';

const addShippingService = async (data) => {
	try {
		const { userID, products } = data;

		const shipping = await db.Shippings.create({
			userID: userID,
			amount: 3,
			shipping_address: '',
			shipping_fee: 0,
			shipping_phone: '123',
			shipping_email: '',
			shipping_status: 0,
		});
		if (shipping.id) {
			const orders = await db.Orders.bulkCreate(
				products.map((product) => ({
					ShippingID: shipping.id,
					ProductID: product.id,
					order_quantity: product.quantity,
					order_price: product.price,
					order_color: product.color[0],
					order_size: product.size[0],
					order_status: 0,
				}))
			);
			return {
				EM: 'Order Success !',
				EC: 0,
				DT: '',
			};
		} else
			return {
				EM: 'ERROR from db',
				EC: -1,
				DT: '',
			};
	} catch (error) {
		console.log(error);
		return {
			EM: 'ERROR from Server',
			EC: -1,
			DT: '',
		};
	}
};

module.exports = {
	addShippingService,
};
