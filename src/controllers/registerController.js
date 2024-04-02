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

module.exports = { signup, login };
