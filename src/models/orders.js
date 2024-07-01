const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	class Orders extends Model {
		static associate(models) {
			Orders.belongsTo(models.Users, {
				foreignKey: 'userID',
			});
			Orders.hasMany(models.OrderDetail, {
				foreignKey: 'orderID',
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
			userID: {
				type: DataTypes.UUID,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			amount: DataTypes.FLOAT,
			order_address: DataTypes.STRING,
			order_fee: DataTypes.FLOAT,
			order_phone: DataTypes.STRING,
			order_email: DataTypes.STRING,
			order_status: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Orders',
		}
	);

	return Orders;
};
