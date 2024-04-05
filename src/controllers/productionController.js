require('dotenv').config();
const upLoadProduction = async (req, res) => {
	try {
		const url = `${process.env.STORE_PRODUCT}/${req.files[0].filename}`;
		console.log(req);
	} catch (error) {
		console.log(error);
		return res.stastus(500).json({ EM: 'ERROR from server', EC: -1, DT: '' });
	}
};
module.exports = { upLoadProduction };
