import * as dotenv from 'dotenv';
import * as path from 'path';
import { description, name, version } from '../../package.json';

dotenv.config({
	path: path.join(process.cwd(), '.env'),
});

/**
 * Environment variables
 */

export default {
	app: {
		root_path: path.join(process.cwd()),
		name,
		version,
		description,
		port: Number(process.env.PORT) || 3000,
		node_env: process.env.NODE_ENV || 'development',
	},
	session: {
		name: process.env.SESSION_NAME || 'sid',
		secret: process.env.SESION_SECRET || 'secret',
		maxAge: Number(process.env.SESSION_MAX_AGE) || 86400000 * 7,
	},
	database: {
		host: process.env.DB_HOST || 'localhost',
		port: Number(process.env.DB_PORT) || 3306,
		username: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
		name: process.env.DB_NAME || 'nodejs',
		dialect: process.env.DB_DIALECT || 'mysql',
		max: Number(process.env.DB_POOL_MAX) || 5,
		min: Number(process.env.DB_POOL_MIN) || 0,
		acquire: Number(process.env.DB_POOL_ACQUIRE) || 30000,
		idle: Number(process.env.DB_POOL_IDLE) || 10000,
		logging: process.env.DB_LOGGING === 'true',
		isSync: process.env.DB_SYNC === 'false',
	},
};
