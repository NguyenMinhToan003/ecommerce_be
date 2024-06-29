require('dotenv').config();
import jwt from 'jsonwebtoken';
import db from '../models';
import { getGroupWithRoleUser } from '../services/jwtService';
const nonSecurePaths = [
	'/login',
	'/signup',
	'/logout',
	'/getListUser',
	'/updateAvatar',
	'/uploadProduct',
	'/getProduct',
	'/refreshToken',
	'/search',
];

const createAccessJWT = (payload) => {
	let token = null;
	let key = process.env.JWT_SECRET;
	try {
		token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
	} catch (error) {
		console.log(error);
	}
	return token;
};

const createRefreshJWT = (payload) => {
	let token = null;
	let key = process.env.JWT_SECRET_REFRESH;
	try {
		token = jwt.sign(payload, key, {
			expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
		});
	} catch (error) {
		console.log(error);
	}
	return token;
};

const verifyAccessJWT = (token) => {
	let key = process.env.JWT_SECRET;
	let decoded = null;
	try {
		decoded = jwt.verify(token, key);
	} catch (error) {
		console.log(error);
	}
	return decoded;
};

const verifyRefreshJWT = (token) => {
	let key = process.env.JWT_SECRET_REFRESH;
	let decoded = null;
	try {
		decoded = jwt.verify(token, key);
	} catch (error) {
		console.log(error);
	}
	return decoded;
};

const refreshToken = async (req, res, next) => {
	const refreshTokenCur = req.cookies.refreshToken;

	if (refreshTokenCur) {
		let decoded = verifyRefreshJWT(refreshTokenCur);

		if (decoded) {
			let data = await db.Users.findOne({
				where: { id: decoded.id },
			});
			const group = await getGroupWithRoleUser(data.groupID);
			let user = {
				id: data.id,
				name: data.name,
				email: data.email,
				phone: data.phone,
				address: data.address,
				avatar: data.avatar,
				group: group,
			};
			user.iat = Math.floor(Date.now() / 1000);
			let refreshToken = createRefreshJWT({ id: user.id });
			let accessJWT = createAccessJWT(user);
			req.token = accessJWT;
			req.user = user;
			res.cookie('jwt', accessJWT, {
				httpOnly: true,
				secure: true,
				maxAge: +process.env.JWT_EXPIRES_IN,
			});
			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				secure: true,
				maxAge: +process.env.JWT_REFRESH_EXPIRES_IN,
			});
			return next();
		} else {
			return res.status(403).json({
				EC: -1,
				EM: 'Not authenticate !',
				DT: '',
			});
		}
	} else {
		return res.status(403).json({
			EC: -1,
			EM: 'Not authenticate !',
			DT: '',
		});
	}
};

const checkJWTToken = (req, res, next) => {
	if (nonSecurePaths.includes(req.path)) return next();
	let cookie = req.cookies;
	if (cookie && cookie.jwt) {
		let token = cookie.jwt;
		let decoded = verifyAccessJWT(token);
		if (decoded) {
			// check token expire time && create request.user
			req.user = decoded;
			req.token = token;
			next();
		} else {
			return res.status(401).json({
				EC: -1,
				EM: 'Not authenticate !',
				DT: '',
			});
		}
	} else {
		return res.status(401).json({
			EC: -1,
			EM: 'Not authenticate !',
			DT: '',
		});
	}
};

const checkPermission = (req, res, next) => {
	if (
		nonSecurePaths.includes(req.path) ||
		req.path === '/accessToken' ||
		req.path === 'refreshToken'
	)
		return next();
	if (req.user) {
		let role = req.user.group.Roles;
		let currentUrl = req.path;
		if (!role) {
			return res.status(403).json({
				EC: -1,
				EM: 'You dont Permission to access resource...',
				DT: '',
			});
		}
		let canAccess = role.some((item) => item.url === currentUrl);
		if (canAccess) {
			next();
		} else {
			return res.status(403).json({
				EC: -1,
				EM: 'You dont Permission to access resource...',
				DT: '',
			});
		}
	} else {
		return res.status(401).json({
			EC: -1,
			EM: 'Not authenticate !',
			DT: '',
		});
	}
};

export {
	createAccessJWT,
	verifyAccessJWT,
	checkJWTToken,
	checkPermission,
	createRefreshJWT,
	verifyRefreshJWT,
	refreshToken,
};
