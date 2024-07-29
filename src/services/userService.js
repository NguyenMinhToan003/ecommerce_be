import db from '../models';
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

module.exports = { getListUserServices, getDataUser };
