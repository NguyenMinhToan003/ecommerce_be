import db from '../models';
const getGroupWithRoleUser = async (idGroup) => {
	let roles = await db.Groups.findOne({
		where: { id: idGroup },
		attributes: ['id', 'name', 'description'],
		include: [
			{
				model: db.Roles,
				attributes: ['id', 'url'],
				through: { attributes: [] },
			},
		],
		raw: false,
	});
	return roles ? roles : {};
};

module.exports = { getGroupWithRoleUser };
