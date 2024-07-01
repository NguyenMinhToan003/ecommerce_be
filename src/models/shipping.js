const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	class Shippings extends Model {
		static associate(models) {
			Shippings.belongsTo(models.Users, {
				foreignKey: 'userID',
			});
			Shippings.hasMany(models.Orders, {
				foreignKey: 'ShippingID',
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
