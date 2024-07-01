'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Products extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Products.belongsTo(models.Users, {
				foreignKey: 'userID',
			});
			Products.belongsTo(models.Catagories, {
				foreignKey: 'catagoryID',
			});
			Products.hasMany(models.OrderDetail, {
				foreignKey: 'productID',
			});
		}
	}
	Products.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: DataTypes.STRING,
			star: DataTypes.FLOAT,
			price: DataTypes.FLOAT,
			size: DataTypes.STRING,
			color: DataTypes.STRING,
			detail: DataTypes.STRING,
			quantity: DataTypes.INTEGER,
			image: DataTypes.STRING(1000),
			countDown: DataTypes.FLOAT,
			userID: DataTypes.UUID,
			catagoryID: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Products',
		}
	);
	return Products;
};
