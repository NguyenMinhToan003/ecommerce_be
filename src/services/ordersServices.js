import db from '../models';

const addOrders = async (data) => {
	try {
		const { userID, products } = data;
		const order = await db.Orders.create({
			userID: userID,
			amount: products.reduce(
				(total, product) => total + product.price * product.quantity,
				0
			),
			order_address: 'HCM',
			order_fee: 0,
			order_phone: '123',
			order_email: '',
			order_status: 0,
		});
		if (order.id) {
			const orders = await db.OrderDetail.bulkCreate(
				products.map((product) => ({
					orderID: order.id,
					productID: product.id,
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
		const { count, rows } = await db.Orders.findAndCountAll({
			include: [
				{
					model: db.Users,
					attributes: ['id', 'name', 'email'],
				},
				{
					model: db.OrderDetail,
					attributes: ['quantity', 'price', 'color', 'size', 'status'],
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
const getOrderDetailService = async (orderID) => {
	try {
		const order = await db.Orders.findOne({
			where: { id: orderID },
			include: [
				{
					model: db.Users,
					attributes: ['id', 'name', 'email'],
				},
				{
					model: db.OrderDetail,
					attributes: ['quantity', 'price', 'color', 'size', 'status'],
					include: [
						{
							model: db.Products,
							attributes: ['name', 'price'],
						},
					],
				},
			],
		});
		return {
			EM: 'get Order Success',
			EC: 0,
			DT: order,
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
	addOrders,
	getOrdersService,
	getOrderDetailService,
};
