'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('OrderDetail', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.fn('UUID'),
				allowNull: false,
				primaryKey: true,
			},
			orderID: {
				type: Sequelize.UUID,
				references: {
					model: 'Orders',
					key: 'id',
				},
			},
			productID: {
				type: Sequelize.UUID,
				references: {
					model: 'Products',
					key: 'id',
				},
			},
			quantity: {
				type: Sequelize.INTEGER,
			},
			price: {
				type: Sequelize.FLOAT,
			},
			color: {
				type: Sequelize.STRING,
			},
			size: {
				type: Sequelize.STRING,
			},
			status: {
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable('OrderDetail');
	},
};
