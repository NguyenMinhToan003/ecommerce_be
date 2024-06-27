'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Shippings extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Shippings.belongsTo(models.Users, {
				foreignKey: 'userID',
			});
		}
	}
	Shippings.init(
		{
			userID: DataTypes.INTEGER,
			amount: DataTypes.FLOAT,
			shipping_address: DataTypes.STRING,
			shipping_fee: DataTypes.FLOAT,
			shipping_phone: DataTypes.STRING,
			shipping_email: DataTypes.STRING,
			shipping_status: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Shippings',
		}
	);
	return Shippings;
};
