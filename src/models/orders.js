const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	class Orders extends Model {
		static associate(models) {
			Orders.belongsTo(models.Shippings, {
				foreignKey: 'ShippingID',
			});
		}
	}

	Orders.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			ShippingID: {
				type: DataTypes.UUID,
				references: {
					model: 'Shippings',
					key: 'id',
				},
			},
			ProductID: {
				type: DataTypes.UUID,
				references: {
					model: 'Products',
					key: 'id',
				},
			},
			order_quantity: {
				type: DataTypes.INTEGER,
			},
			order_price: {
				type: DataTypes.FLOAT,
			},
			order_date: {
				type: DataTypes.DATE,
			},
			order_color: {
				type: DataTypes.STRING,
			},
			order_size: {
				type: DataTypes.STRING,
			},
			order_status: {
				type: DataTypes.BOOLEAN,
			},
		},
		{
			sequelize,
			modelName: 'Orders',
		}
	);

	return Orders;
};
