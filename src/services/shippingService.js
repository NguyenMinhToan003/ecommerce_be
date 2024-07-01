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
			if (orders)
				return {
					EM: 'Order Success !',
					EC: 0,
					DT: '',
				};
			else
				return {
					EM: 'ERROR from db',
					EC: -1,
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
const getOrdersService = async (limit, page) => {
	try {
		const offset = page ? (page - 1) * limit : 0;
		const { count, rows } = await db.Shippings.findAndCountAll({
			include: [
				{
					model: db.Users,
					attributes: ['id', 'name', 'email'],
				},
				{
					model: db.Orders,
					attributes: [
						'order_quantity',
						'order_price',
						'order_color',
						'order_size',
						'order_status',
					],
					include: [
						{
							model: db.Products,
							attributes: ['name', 'price'],
						},
					],
				},
			],
			limit: +limit,
			offset: offset,
			order: [['createdAt', 'DESC']],
		});
		let data = {
			totalRows: count,
			listShipping: rows,
			totalPage: Math.ceil(count / limit),
		};
		return {
			EM: 'get List Shipping Success',
			EC: 0,
			DT: data,
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
	getOrdersService,
};
