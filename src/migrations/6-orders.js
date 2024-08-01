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
			userID: {
				type: Sequelize.UUID,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			amount: {
				type: Sequelize.FLOAT,
			},
			order_address: {
				type: Sequelize.STRING,
			},
			order_fee: {
				type: Sequelize.FLOAT,
			},
			order_phone: {
				type: Sequelize.STRING,
			},
			order_email: {
				type: Sequelize.STRING,
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
