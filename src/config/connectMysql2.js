import mysql from 'mysql2/promise';
// create the connection to database
console.log('creating connectDatabsae .....');
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'ecommerce_database',
});
export default pool;
