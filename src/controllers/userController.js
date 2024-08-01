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
const getUser = async (req, res) => {
	try {
		const id = req.body.id;
		const result = await userService.getDataUser(id);
		return res.status(200).json({
			EM: result.EM,
			EC: result.EC,
			DT: result.DT,
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
const updateUser = async (req, res) => {
	try {
		const data = req.body;
		const result = await userService.updateUser(data);
		return res.status(200).json({
			EM: result.EM,
			EC: result.EC,
			DT: result.DT,
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
const deleteUser = async (req, res) => {
	try {
		const id = req.body.id;
		const idAction = req.body.idAction;
		const result = await userService.deleteUser(id, idAction);
		return res.status(200).json({
			EM: result.EM,
			EC: result.EC,
			DT: result.DT,
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
module.exports = { getListUser, getUser, updateUser, deleteUser };
