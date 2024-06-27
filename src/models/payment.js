'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Payments extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Payments.belongsTo(models.Shippings, {
				foreignKey: 'ShippingID',
			});
		}
	}
	Payments.init(
		{
			ShippingID: DataTypes.INTEGER,
			amount: DataTypes.FLOAT,
			payment_type: DataTypes.STRING,
			payment_status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Payments',
		}
	);
	return Payments;
};
