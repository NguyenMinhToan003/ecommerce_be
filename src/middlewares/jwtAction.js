require('dotenv').config();
import jwt from 'jsonwebtoken';
const nonSecurePaths = [
	'/login',
	'/signup',
	'/logout',
	'/cart/load',
	'/ebook/search',
	// "/ebook/upload",
	// "/ebook/upload",
	// "/ebook/read",
	// "/ebook/detail",
	// "/role",
	// "/role/read",
	// "/role/create",
	// "/role/update",
	// "/role/delete",
	// "/group/read",
	// "/groupwithrole",
	// "/groupwithrole/create",
];

const createJWT = (payload) => {
	let token = null;
	let key = process.env.JWT_SECRET;
	try {
		token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
	} catch (error) {
		console.log(error);
	}
	return token;
};
const verifyToken = (token) => {
	let key = process.env.JWT_SECRET;
	let decoded = null;
	try {
		decoded = jwt.verify(token, key);
	} catch (error) {
		console.log(error);
	}
	return decoded;
};

const checkJWTToken = (req, res, next) => {
	if (nonSecurePaths.includes(req.path)) return next();
	let cookie = req.cookies;
	if (cookie && cookie.jwt) {
		let token = cookie.jwt;
		let decoded = verifyToken(token);
		if (decoded) {
			req.user = decoded;
			req.token = token;
			next();
		} else
			return res.status(401).json({
				EC: -1,
				EM: 'Not authenticate !',
				DT: '',
			});
	} else {
		return res.status(401).json({
			EC: -1,
			EM: 'Not authenticate !',
			DT: '',
		});
	}
};
const checkPermission = (req, res, next) => {
	if (nonSecurePaths.includes(req.path) || req.path === '/checkToken')
		return next();
	if (req.user) {
		let role = req.user.group.Roles;
		let currentUrl = req.path;
		if (!role)
			return res.status(403).json({
				EC: -1,
				EM: 'You dont Permission to access resource...',
				DT: '',
			});
		let canAccess = role.some((item) => item.url === currentUrl);
		if (canAccess) next();
		else
			return res.status(403).json({
				EC: -1,
				EM: 'You dont Permission to access resource...',
				DT: '',
			});
	} else
		return res.status(401).json({
			EC: -1,
			EM: 'Not authenticate !',
			DT: '',
		});
};

export { createJWT, verifyToken, checkJWTToken, checkPermission };
