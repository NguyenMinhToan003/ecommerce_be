'use strict';
const { Model } = require('sequelize');
const group = require('../migrations/group');
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
		}
	}
	Products.init(
		{
			name: DataTypes.STRING,
			star: DataTypes.STRING,
			price: DataTypes.STRING,
			size: DataTypes.STRING,
			color: DataTypes.STRING,
			detail: DataTypes.STRING,
			quantity: DataTypes.STRING,
			image: DataTypes.STRING,
			userID: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Products',
		}
	);
	return Products;
};
