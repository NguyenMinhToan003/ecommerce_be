'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Orders extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Orders.belongsTo(models.Shippings, {
				foreignKey: 'ShippingID',
			});
		}
	}
	Orders.init(
		{
			ShippingID: DataTypes.UUID,
			ProductID: DataTypes.UUID,
			order_quantity: DataTypes.INTEGER,
			order_price: DataTypes.FLOAT,
			order_date: DataTypes.DATE,
			order_color: DataTypes.STRING,
			order_size: DataTypes.STRING,
			order_status: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Orders',
		}
	);
	return Orders;
};
