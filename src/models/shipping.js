'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	class Shippings extends Model {
		static associate(models) {
			Shippings.belongsTo(models.Users, {
				foreignKey: 'userID',
			});
		}
	}

	Shippings.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			userID: {
				type: DataTypes.UUID,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			amount: {
				type: DataTypes.FLOAT,
			},
			shipping_address: {
				type: DataTypes.STRING,
			},
			shipping_fee: {
				type: DataTypes.FLOAT,
			},
			shipping_phone: {
				type: DataTypes.STRING,
			},
			shipping_email: {
				type: DataTypes.STRING,
			},
			shipping_status: {
				type: DataTypes.BOOLEAN,
			},
		},
		{
			sequelize,
			modelName: 'Shippings',
		}
	);

	return Shippings;
};
