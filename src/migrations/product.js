'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			star: {
				type: Sequelize.STRING,
			},
			price: {
				type: Sequelize.STRING,
			},
			size: {
				type: Sequelize.STRING,
			},
			color: {
				type: Sequelize.STRING,
			},
			detail: {
				type: Sequelize.STRING,
			},
			quantity: {
				type: Sequelize.STRING,
			},
			image: {
				type: Sequelize.STRING,
			},
			userID: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Products');
	},
};
