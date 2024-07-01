const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	class OrderDetail extends Model {
		static associate(models) {
			OrderDetail.belongsTo(models.Orders, {
				foreignKey: 'orderID',
			});
			OrderDetail.belongsTo(models.Products, {
				foreignKey: 'productID',
			});
		}
	}

	OrderDetail.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			orderID: {
				type: DataTypes.UUID,
				references: {
					model: 'Shippings',
					key: 'id',
				},
			},
			productID: {
				type: DataTypes.UUID,
				references: {
					model: 'Products',
					key: 'id',
				},
			},
			quantity: {
				type: DataTypes.INTEGER,
			},
			price: {
				type: DataTypes.FLOAT,
			},
			color: {
				type: DataTypes.STRING,
			},
			size: {
				type: DataTypes.STRING,
			},
			status: {
				type: DataTypes.BOOLEAN,
			},
		},
		{
			sequelize,
			modelName: 'OrderDetail',
		}
	);

	return OrderDetail;
};
