require('dotenv').config();
import registerService from '../services/registerService';
const signup = async (req, res) => {
	try {
		const data = req.body;
		const user = await registerService.createAccountService(data);
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
const login = async (req, res) => {
	try {
		const data = req.body;
		const user = await registerService.loginService(data);
		if (user.EC === 0) {
			const token = user.DT.token;
			res.cookie('jwt', token, {
				httpOnly: true,
				secure: true,
				maxAge: +process.env.JWT_EXPIRES_IN,
			});
		}
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
const logout = async (req, res) => {
	try {
		const idUser = req.body.id;
		const result = await registerService.logoutService(idUser);
		if (result.EC === 0) res.clearCookie('jwt');
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
const updateAvatar = async (req, res) => {
	try {
		const id = req.body.id;
		const urlImage = `${process.env.STORE_USER}${req.file.filename}`;
		const result = await registerService.updateAvatarService(id, urlImage);
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

module.exports = { signup, logout, login, updateAvatar };
