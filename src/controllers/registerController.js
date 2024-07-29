require('dotenv').config();
import registerService from '../services/registerService';
import { generateSignupEmailTemplate } from '../utils/emailTemplateSigup';

const signup = async (req, res) => {
	try {
		const data = req.body;
		const user = await registerService.createAccountService(data);
		console.log(data);

		if (user.EC === 0) {
			const emailSubject = 'Signup successfully with Ecommerce website';
			const emailBody = generateSignupEmailTemplate(data);
			const sentMail = await registerService.autoSendEmail(
				data.email,
				emailSubject,
				emailBody
			);
			console.log('Email sent:', sentMail);
		}

		return res.status(200).json({
			EM: user.EM,
			EC: user.EC,
			DT: user.DT,
		});
	} catch (error) {
		console.error('Error in signup process:', error);
		return res.status(500).json({
			EM: 'Error from server',
			EC: -1,
			DT: '',
		});
	}
};

const login = async (req, res) => {
	try {
		const { account, password } = req.body;
		const user = await registerService.loginService(account, password);

		if (user.EC === 0) {
			const { token, refreshtoken } = user.DT;
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
		console.error('Error in login process:', error);
		return res.status(500).json({
			EM: 'Error from server',
			EC: -1,
			DT: '',
		});
	}
};

const logout = async (req, res) => {
	try {
		const { id: idUser } = req.body;
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
		console.error('Error in logout process:', error);
		return res.status(500).json({
			EM: 'Error from server',
			EC: -1,
			DT: '',
		});
	}
};

const updateAvatar = async (req, res) => {
	try {
		const { id } = req.body;
		const urlImage = `${process.env.STORE_USER}${req.file.filename}`;
		const result = await registerService.updateAvatarService(id, urlImage);

		return res.status(200).json({
			EM: result.EM,
			EC: result.EC,
			DT: result.DT,
		});
	} catch (error) {
		console.error('Error in updating avatar:', error);
		return res.status(500).json({
			EM: 'Error from server',
			EC: -1,
			DT: '',
		});
	}
};

module.exports = { signup, logout, login, updateAvatar };
