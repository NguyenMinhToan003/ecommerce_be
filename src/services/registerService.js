import db from '../models/index';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

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
				[Op.or]: [{ email: data.email }, { phone: data.phone }],
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
		const user = await db.Users.findOne({
			where: { [Op.or]: [{ email: data.account }, { phone: data.account }] },
			raw: true,
		});

		if (user) {
			const isValid = await comparePassword(data.password, user.password);
			if (isValid) {
				return {
					EM: 'Login successful',
					EC: 0,
					DT: user,
				};
			} else {
				return {
					EM: 'Account or password is invalid',
					EC: 1,
					DT: '',
				};
			}
		}
	} catch (error) {
		console.log(error);
		return {
			EM: 'Error while logging in. Please try again',
			EC: -1,
			DT: '',
		};
	}
};
module.exports = { createAccountService, loginService };
