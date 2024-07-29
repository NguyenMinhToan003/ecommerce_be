import db from '../models';

const addOrders = async (data) => {
	const t = await db.sequelize.transaction();
	try {
		const { userID, products } = data;
		const order = await db.Orders.create(
			{
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
			},
			{ transaction: t }
		);

		if (order && order.id) {
			const orderDetail = await db.OrderDetail.bulkCreate(
				products.map((product) => ({
					orderID: order.id,
					productID: product.id,
					quantity: product.quantity,
					price: product.price,
					color: product.color,
					size: product.size,
					status: 0,
				})),
				{ transaction: t }
			);

			if (orderDetail) {
				await t.commit();
				return {
					EM: 'Order Success !',
					EC: 0,
					DT: order,
				};
			} else {
				await t.rollback();
				return {
					EM: 'Error from DB',
					EC: -1,
					DT: '',
				};
			}
		} else {
			await t.rollback();
			return {
				EM: 'Error from DB',
				EC: -1,
				DT: '',
			};
		}
	} catch (error) {
		await t.rollback();
		console.error('Transaction error:', error);
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

		const data = {
			totalRows: count,
			listShipping: rows,
			totalPage: Math.ceil(count / limit),
		};
		return {
			EM: 'Get List Shipping Success',
			EC: 0,
			DT: data,
		};
	} catch (error) {
		console.error('Error fetching orders:', error);
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

		if (order) {
			return {
				EM: 'Get Order Success',
				EC: 0,
				DT: order,
			};
		} else {
			return {
				EM: 'Order not found',
				EC: -1,
				DT: '',
			};
		}
	} catch (error) {
		console.error('Error fetching order details:', error);
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
