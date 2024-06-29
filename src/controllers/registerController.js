require('dotenv').config();
import registerService from '../services/registerService';
const signup = async (req, res) => {
	try {
		const data = req.body;
		const user = await registerService.createAccountService(data);

		if (user.EC === 0) {
			// Send confirmation email
			const emailSubject = 'Signup successfully with Ecommerce website';
			const emailBody = `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
					<h1 style="color: #333; text-align: center;">Welcome to Ecommerce Website</h1>
					<div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
						<h2 style="color: #333;">Hi ${data.name},</h2>
						<p>Thank you for signing up with Ecommerce Website. Below are your account details:</p>
						<ul>
							<li><strong>Email:</strong> ${data.email}</li>
							<li><strong>Address:</strong> ${data.address}</li>
							<li><strong>Phone:</strong> ${data.phone}</li>
							<li><strong>Gender:</strong> ${data.gender === 0 ? 'Male' : 'Female'}</li>
						</ul>
						<p style="text-align: center;"><a href="${
							process.env.URL_FRONTEND
						}" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Visit Website</a></p>
					</div>
					<p style="text-align: center; margin-top: 20px;">Thank you once again!</p>
				</div>
			`;

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
		const idUser = req.body.id;

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
