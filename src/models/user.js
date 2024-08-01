'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Users.belongsTo(models.Groups, {
				foreignKey: 'groupID',
			});
			Users.hasMany(models.Products, {
				foreignKey: 'userID',
			});
			Users.hasMany(models.Orders, {
				foreignKey: 'userID',
			});
		}
	}
	Users.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			address: DataTypes.STRING,
			password: DataTypes.STRING,
			groupID: DataTypes.INTEGER,
			gender: DataTypes.BOOLEAN,
			phone: DataTypes.STRING,
			avatar: DataTypes.STRING,
			logoutAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'Users',
		}
	);

	return Users;
};
