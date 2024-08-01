'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Adding data to 'groups' table
		await queryInterface.bulkInsert(
			'Groups',
			[
				{
					name: 'Admin',
					description: 'Admin',
				},
				{
					name: 'Dev',
					description: 'Developer',
				},
				{
					name: 'Guest',
					description: 'Guest',
				},
				{
					name: 'User',
					description: 'User',
				},
			],
			{}
		);

		await queryInterface.bulkInsert('Categories', [
			{
				name: 'Thiết bị điện tử',
				description: 'Thiết bị điện tử',
			},
			{
				name: 'Thời trang',
				description: 'Thời trang',
			},
			{
				name: 'Đồ gia dụng',
				description: 'Đồ gia dụng',
			},
		]);
		// Adjusted seed data for Users
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					email: 'admin@gmail.com',
					name: 'Nguyen Minh Toan (admin)',
					gender: false,
					address: 'HCM city',
					phone: '12345678',
					groupId: 1,
					password:
						'$2b$10$liU6Cwlo3u4r4sBp/QparuYrp.cq5B51J8ioHuFjyVAM37hD2TqEq',
					avatar:
						'http://localhost:4040/assets/images/default/avatardefault.png',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					email: 'dev@gmail.com',
					name: 'Nguyen Minh Toan (dev)',
					gender: true,
					address: 'HCM city',
					phone: '0375216147',
					groupId: 2,
					password:
						'$2b$10$liU6Cwlo3u4r4sBp/QparuYrp.cq5B51J8ioHuFjyVAM37hD2TqEq',
					avatar:
						'http://localhost:4040/assets/images/default/avatardefault.png',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);

		// Adding data to 'roles' table
		await queryInterface.bulkInsert(
			'Roles',
			[
				{
					url: '/account',
					description: 'getAccount',
				},
				{
					url: '/user/read',
					description: 'Read List User',
				},
				{
					url: '/user/create',
					description: 'Create  User',
				},
				{
					url: '/user/update',
					description: 'Update User',
				},
				{
					url: '/user/delete',
					description: 'Delete User',
				},
				{
					url: '/role/read',
					description: 'Read List Role',
				},
				{
					url: '/role/create',
					description: 'Create Role',
				},
				{
					url: '/role/update',
					description: 'Update Role',
				},
				{
					url: '/role/delete',
					description: 'Delete Role',
				},
				{
					url: '/group/read',
					description: 'Read List Group',
				},
				{
					url: '/group/create',
					description: 'Create Group',
				},
				{
					url: '/group/update',
					description: 'Update Group',
				},
				{
					url: '/group/delete',
					description: 'Delete Group',
				},
				{
					url: '/groupwithrole',
					description: 'Group with Role',
				},
				{
					url: '/role',
					description: 'Read All Role',
				},
				{
					url: '/groupwithrole/create',
					description: 'Create Group with Role',
				},
				{
					url: '/ebook/upload',
					description: 'Upload Ebook',
				},
				{
					url: '/ebook/read',
					description: 'Read Ebook',
				},
				{
					url: '/ebook/detail',
					description: 'Read Detail Ebook',
				},
			],
			{}
		);

		// Adding data to 'group_roles' table
		await queryInterface.bulkInsert(
			'Group_Roles',
			[
				{
					groupId: 1,
					roleId: 1,
				},
				{
					groupId: 1,
					roleId: 2,
				},
				{
					groupId: 1,
					roleId: 3,
				},
				{
					groupId: 1,
					roleId: 4,
				},
				{
					groupId: 1,
					roleId: 5,
				},
				{
					groupId: 1,
					roleId: 6,
				},
				{
					groupId: 1,
					roleId: 7,
				},
				{
					groupId: 1,
					roleId: 8,
				},
				{
					groupId: 1,
					roleId: 8,
				},
				{
					groupId: 1,
					roleId: 10,
				},
				{
					groupId: 1,
					roleId: 11,
				},
				{
					groupId: 1,
					roleId: 12,
				},
				{
					groupId: 1,
					roleId: 13,
				},
				{
					groupId: 1,
					roleId: 14,
				},
				{
					groupId: 1,
					roleId: 15,
				},
				{
					groupId: 1,
					roleId: 16,
				},
				{
					groupId: 1,
					roleId: 17,
				},
				{
					groupId: 1,
					roleId: 18,
				},
				{
					groupId: 1,
					roleId: 19,
				},
				{
					groupId: 1,
					roleId: 20,
				},
				// Add other data rows here...
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
