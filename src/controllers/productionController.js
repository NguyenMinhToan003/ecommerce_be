require('dotenv').config();
const upLoadProduction = async (req, res) => {
	const url = `${process.env.STORE_PRODUCT}/${req.files[0].filename}`;
	console.log(url);
};
module.exports = { upLoadProduction };
