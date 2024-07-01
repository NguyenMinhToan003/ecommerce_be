'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Products', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.fn('UUID'),
				allowNull: false,
				primaryKey: true,
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
				type: Sequelize.STRING(1000),
			},
			countDown: {
				type: Sequelize.FLOAT,
			},
			userID: {
				type: Sequelize.UUID,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			catagoryID: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Categories',
					key: 'id',
				},
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
