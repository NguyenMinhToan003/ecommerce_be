'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.fn('UUID'),
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
			},
			address: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			groupID: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Groups',
					key: 'id',
				},
			},
			gender: {
				type: Sequelize.STRING,
			},
			phone: {
				type: Sequelize.STRING,
			},
			avatar: {
				type: Sequelize.STRING,
			},
			logoutAt: {
				type: Sequelize.DATE,
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
		await queryInterface.dropTable('Users');
	},
};
