import userService from '../services/userService';
const getListUser = async (req, res) => {
	try {
		const { page, limit } = req.query;
		const user = await userService.getListUserServices(page, limit);
		return res.status(200).json({
			EM: user.EM,
			EC: user.EC,
			DT: user.DT,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			EM: 'ERROR from server',
			EC: -1,
			DT: '',
		});
	}
};
module.exports = { getListUser };
