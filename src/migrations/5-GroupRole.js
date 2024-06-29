'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Group_Roles', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			roleID: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Roles',
					key: 'id',
				},
			},
			groupID: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Groups',
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
		await queryInterface.dropTable('Group_Roles');
	},
};
