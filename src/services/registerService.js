require('dotenv').config();
import db from '../models/index';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { getGroupWithRoleUser } from './jwtService';
import { createJWT } from '../middlewares/jwtAction';
import nodemailer from 'nodemailer';

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};
const comparePassword = async (password, hashedPassword) => {
	const isValid = await bcrypt.compare(password, hashedPassword);
	return isValid;
};

const createAccountService = async (data) => {
	try {
		const [user, created] = await db.Users.findOrCreate({
			where: {
				[Op.or]: [{ email: data.email }, { phone: +data.phone }],
			},
			defaults: {
				name: data.name,
				email: data.email,
				password: await hashPassword(data.password),
				address: data.address,
				groupID: data.group,
				gender: data.gender,
				phone: data.phone,
			},
		});
		if (created) {
			return {
				EM: 'Account created successfully',
				EC: 0,
				DT: user,
			};
		} else {
			return {
				EM: 'Account already exists',
				EC: 1,
				DT: '',
			};
		}
	} catch (error) {
		console.log(error);
		return {
			EM: 'Error while creating account. Please try again.',
			EC: -1,
			DT: '',
		};
	}
};
const loginService = async (data) => {
	try {
		let user = await db.Users.findOne({
			where: { [Op.or]: [{ email: data.account }, { phone: data.account }] },
			raw: true,
		});

		if (user) {
			const isValid = await comparePassword(data.password, user.password);
			if (isValid) {
				const group = await getGroupWithRoleUser(user.groupID);
				const dataUser = {
					id: user.id,
					name: user.name,
					email: user.email,
					phone: user.phone,
					address: user.address,
					avatar: user.avatar,
					group: group,
				};
				const token = createJWT(dataUser);
				return {
					EM: 'Login successful',
					EC: 0,
					DT: {
						user: dataUser,
						token: token,
					},
				};
			} else {
				return {
					EM: 'Account or password is invalid',
					EC: 1,
					DT: '',
				};
			}
		}
		return {
			EM: 'Account or password is invalid',
			EC: 1,
			DT: '',
		};
	} catch (error) {
		console.log(error);
		return {
			EM: 'Error while logging in. Please try again',
			EC: -1,
			DT: '',
		};
	}
};
const logoutService = async (idUser) => {
	try {
		const result = await db.Users.update(
			{ logoutAt: new Date().getTime() },
			{ where: { id: +idUser } }
		);
		return {
			EM: result ? 'Logout successfully' : 'Logout failed',
			EC: result ? 0 : 1,
			DT: '',
		};
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			EM: 'ERROR from server',
			EC: -1,
			DT: '',
		});
	}
};
const updateAvatarService = async (id, urlImage) => {
	try {
		const result = await db.Users.update(
			{ avatar: urlImage },
			{ where: { id: +id } }
		);
		return {
			EM: result ? 'Update avatar successfully' : 'Update avatar failed',
			EC: result ? 0 : 1,
			DT: '',
		};
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			EM: 'ERROR from server',
			EC: -1,
			DT: '',
		});
	}
};
const autoSendEmail = async (email, subject, content) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS,
		},
	});
	const mailAction = {
		from: 'Website Ecommerce ',
		to: email,
		subject: subject,
		html: content,
	};
	try {
		const result = await transporter.sendMail(mailAction);
		return {
			EM: 'Send email successfully',
			EC: 0,
			DT: result,
		};
	} catch (error) {
		console.log(error);
		return {
			EM: 'Error while sending email',
			EC: -1,
			DT: '',
		};
	}
};

module.exports = {
	createAccountService,
	loginService,
	logoutService,
	updateAvatarService,
	autoSendEmail,
};
