import db from '../models';
const getRoles = async (req, res) => {
	const roles = await db.Groups.findOne({
		where: { id: 1 },
		attributes: ['name', 'id', 'description'],
		include: [
			{
				model: db.Roles,
				attributes: ['id', 'url'],
				through: { attributes: [] },
			},
		],
	});
	return res.status(200).json({ roles });
};
module.exports = { getRoles };
