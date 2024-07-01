import { Op } from 'sequelize';
import db from '../models';
const getProductService = async ({ limit, page }) => {
	try {
		const offset = page ? (page - 1) * limit : 0;
		const { count, rows } = await db.Products.findAndCountAll({
			include: [
				{
					model: db.Users,
					attributes: ['name'],
				},
			],
			limit: +limit,
			offset: offset,
			order: [['id', 'DESC']],
		});
		let totalPage = Math.ceil(count / limit);
		const data = {
			totalRows: count,
			totalPage: totalPage,
			record: rows,
		};
		return {
			EM: `get product success ${totalPage} page with ${count} records`,
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
const deleteProduct = async (id) => {
	try {
		const result = await db.Products.destroy({
			where: {
				id: id,
			},
		});
		return {
			EM: 'delete product success',
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
const upLoadtProduct = async (product) => {
	try {
		console.log('>>>>>>> product ', product);
		const result = await db.Products.create({
			name: product.name,
			price: product.price == -1 ? 0 : +product.price,
			image: product.url,
			detail: product.detail,
			userID: product.userID,
			star: 5,
			size: product.size,
			color: '#000000',
			quantity: 9999,
		});
		return {
			EM: 'upload product success',
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
const updateProduct = async (product) => {
	try {
		const result = await db.Products.update(
			{
				name: product.name,
				price: product.price == -1 ? 0 : product.price,
				image: product.url,
				detail: product.detail,
				userID: product.userID,
				star: 5,
				size: product.size,
				color: '#000000',
				quantity: 9999,
			},
			{
				where: {
					id: product.id,
				},
			}
		);
		return {
			EM: 'update product success',
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
const searchProductService = async (name, limit, page) => {
	try {
		let offset = (page - 1) * limit;
		console.log(limit, page);
		if (!name || name === '')
			return { EM: 'Search product by name', EC: 0, DT: [] };
		const { count, rows } = await db.Products.findAndCountAll({
			where: {
				name: {
					[Op.like]: `%${name}%`,
				},
			},
			include: [
				{
					model: db.Users,
					attributes: ['name'],
				},
			],
			offset: +offset,
			limit: limit ? +limit : 10,
			order: [['id', 'DESC']],
		});

		return {
			EM: `search product success with ${count} records`,
			EC: 0,
			DT: rows,
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
const detailProductService = async (id) => {
	try {
		console.log(id);
		const result = await db.Products.findOne({
			where: {
				id: id,
			},
			include: [
				{
					model: db.Users,
					attributes: ['name'],
				},
			],
		});

		return {
			EM: 'get detail product success',
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
module.exports = {
	upLoadtProduct,
	getProductService,
	deleteProduct,
	updateProduct,
	searchProductService,
	detailProductService,
};
