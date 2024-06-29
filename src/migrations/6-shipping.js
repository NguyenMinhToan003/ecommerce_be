'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Shippings', {
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
			shipping_address: {
				type: Sequelize.STRING,
			},
			shipping_fee: {
				type: Sequelize.FLOAT,
			},
			shipping_phone: {
				type: Sequelize.STRING,
			},
			shipping_email: {
				type: Sequelize.STRING,
			},
			shipping_status: {
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
		await queryInterface.dropTable('Shippings');
	},
};
