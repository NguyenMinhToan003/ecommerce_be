const accessToken = (req, res) => {
	try {
		const token = req.token;
		const user = req.user;

		return res.status(200).json({
			EM: 'Access token successfully',
			EC: 0,
			DT: {
				user: user,
				token: token,
			},
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

module.exports = { accessToken };
