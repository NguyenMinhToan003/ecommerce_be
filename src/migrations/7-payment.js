'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Payments', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
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
			amount: {
				type: Sequelize.FLOAT,
			},
			payment_type: {
				type: Sequelize.STRING,
			},
			payment_status: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable('Payments');
	},
};
