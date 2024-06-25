require('dotenv').config();
import registerService from '../services/registerService';
const signup = async (req, res) => {
	try {
		const data = req.body;
		const user = await registerService.createAccountService(data);
		if (user.EC === 0) {
			const sentMail = await registerService.autoSendEmail(
				data.email,
				'Sigup successfully with Ecommerce website',
				`
				<div>
					<h1>Hi ${data.name}</h1>
					<p>Thanks for signing up with Ecommerce website</p>
					<p>Here is your account information:</p>
					<p>Email: ${data.email}</p>
					<p>Address: ${data.address}</p>
					<p>Phone: ${data.phone}</p>
					<p>Gender:${data.gender === 1 ? 'Nam' : 'Nu'}</p>
					<p><a href=${process.env.URL_FRONTEND}>Visit Website</a></p>
				</div>
				`
			);
			console.log(sentMail);
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
const login = async (req, res) => {
	try {
		const data = req.body;
		const account = data.account;
		const password = data.password;
		const user = await registerService.loginService(account, password);
		if (user.EC === 0) {
			const token = user.DT.token;
			const refreshtoken = user.DT.refreshtoken;
			console.log(token, refreshtoken);
			res.cookie('jwt', token, {
				httpOnly: true,
				secure: true,
				maxAge: +process.env.JWT_EXPIRES_IN,
			});
			res.cookie('refreshToken', refreshtoken, {
				httpOnly: true,
				secure: true,
				maxAge: +process.env.JWT_REFRESH_EXPIRES_IN,
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
		const idUser = +req.body.id;
		console.log(idUser);
		const result = await registerService.logoutService(idUser);
		if (result.EC === 0) {
			res.clearCookie('refreshToken');
			res.clearCookie('jwt');
		}
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
