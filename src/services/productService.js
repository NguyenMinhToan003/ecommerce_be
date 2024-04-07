import db from '../models';
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
			size: 'M',
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
module.exports = { upLoadtProduct };
