import db from '../models';
const getProduct = async ({ limit, page }) => {
	try {
		const offset = page ? (page - 1) * limit : 0;
		const { count, rows } = await db.Products.findAndCountAll({
			limit: +limit,
			offset: offset,
			order: [['id', 'DESC']],
		});
		let totalPage = Math.ceil(count / limit);
		const data = {
			totalRows: count,
			totalPage: totalPage,
			book: rows,
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
			price: product.price == -1 ? 0 : product.price,
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
module.exports = { upLoadtProduct, getProduct, deleteProduct, updateProduct };
