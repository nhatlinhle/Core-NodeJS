const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
	path: path.join(process.cwd(), '.env'),
});

const config = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
	},
	test: {
		username: process.env.CI_DB_USERNAME,
		password: process.env.CI_DB_PASSWORD,
		database: process.env.CI_DB_NAME,
		host: '127.0.0.1',
		port: 3306,
		dialect: process.env.DB_DIALECT,
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
	production: {
		username: process.env.PROD_DB_USERNAME,
		password: process.env.PROD_DB_PASSWORD,
		database: process.env.PROD_DB_NAME,
		host: process.env.PROD_DB_HOSTNAME,
		port: process.env.PROD_DB_PORT,
		dialect: process.env.PROD_DB_DIALECT,
	},
};

module.exports = {
	...config,
};
