import { raw } from 'body-parser';
import db from '../models';
import { Op } from 'sequelize';
const getListUserServices = async (page, limit) => {
	try {
		let offset = (page - 1) * limit;
		const { count, rows } = await db.Users.findAndCountAll({
			attributes: ['id', 'name', 'email', 'gender', 'logoutAt', 'avatar'],
			include: [{ model: db.Groups, attributes: ['name'] }],
			offset: +offset,
			limit: +limit,
			order: [['createdAt', 'DESC']],
		});
		let data = {
			totalRows: count,
			listUsers: rows,
			totalPage: Math.ceil(count / limit),
		};

		return {
			EM: 'Get list user success page ' + page + ' limit ' + limit + ' success',
			EC: 0,
			DT: data,
		};
	} catch (error) {
		console.log(error);
		return {
			EM: 'ERROR from server',
			EC: -1,
			DT: '',
		};
	}
};
const getDataUser = async (id) => {
	try {
		const result = await db.Users.findOne({ where: { id: id }, raw: true });
		return {
			EM: 'GET User',
			EC: 0,
			DT: result,
		};
	} catch (error) {
		console.log(error);
		return {
			EM: 'ERROR from server',
			EC: -1,
			DT: '',
		};
	}
};
const updateUser = async (data) => {
	try {
		const findUser = await db.Users.findOne({
			where: {
				[Op.or]: [{ email: data.email }, { phone: data.phone }],
			},
			raw: true,
		});
		if (findUser && findUser.id !== data.id) {
			return {
				EM: 'Email or Phone already exists',
				EC: 1,
				DT: '',
			};
		}
		const result = await db.Users.update(
			{
				name: data.name,
				email: data.email,
				address: data.address,
				phone: data.phone,
				groupID: data.groupID,
				gender: data.gender,
			},
			{ where: { id: data.id } }
		);
		return {
			EM: 'Update User success',
			EC: 0,
			DT: result,
		};
	} catch (error) {
		console.log(error);
		return {
			EM: 'ERROR from server',
			EC: -1,
			DT: '',
		};
	}
};
const deleteUser = async (id, idAction) => {
	try {
		const user = await db.Users.findOne({ where: { id: id } });
		if (!user) {
			return {
				EM: 'User not found',
				EC: 1,
				DT: '',
			};
		}
		if (user.id === idAction) {
			return {
				EM: 'You can not delete yourself',
				EC: 1,
				DT: '',
			};
		}
		const orderByUser = await db.Orders.findAll({
			where: { userID: user.id },
			raw: true,
		});

		orderByUser.forEach(async (item) => {
			const order = await db.OrderDetail.destroy({
				where: { orderID: item.id },
			});
		});
		const deleteOrder = await db.Orders.destroy({ where: { userID: user.id } });
		const deleteProduct = await db.Products.destroy({
			where: { userID: user.id },
		});
		const result = await user.destroy();
		return {
			EM: 'Delete User success',
			EC: 0,
			DT: result,
		};
	} catch (error) {
		console.log(error);
		return {
			EM: 'ERROR from server',
			EC: -1,
			DT: '',
		};
	}
};
module.exports = { getListUserServices, getDataUser, updateUser, deleteUser };
