'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Orders', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.fn('UUID'),
				allowNull: false,
				primaryKey: true,
			},
			ShippingID: {
				type: Sequelize.UUID,
				references: {
					model: 'Shippings',
					key: 'id',
				},
			},
			ProductID: {
				type: Sequelize.UUID,
				references: {
					model: 'Products',
					key: 'id',
				},
			},
			order_quantity: {
				type: Sequelize.INTEGER,
			},
			order_price: {
				type: Sequelize.FLOAT,
			},
			order_status: {
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
		await queryInterface.dropTable('Orders');
	},
};
