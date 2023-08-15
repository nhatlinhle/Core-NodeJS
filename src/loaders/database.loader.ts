import { Dialect, Sequelize } from 'sequelize';
import { env, logger } from '../configs';
import * as models from '../models';

class Database {
	protected sequelize: Sequelize;

	constructor() {
		this.sequelize = this.initSequelize();
	}

	initSequelize(): Sequelize {
		const dbConfig = env.database;

		return new Sequelize(
			dbConfig.name,
			dbConfig.username,
			dbConfig.password,
			{
				host: dbConfig.host,
				dialect: dbConfig.dialect as Dialect,
				port: dbConfig.port,
				pool: {
					max: dbConfig.max,
					min: dbConfig.min,
					acquire: dbConfig.acquire,
					idle: dbConfig.idle,
				},
				logging: dbConfig.logging,
			},
		);
	}

	async connectToDatabase() {
		try {
			await this.sequelize.authenticate();
			await Promise.all(
				Object.values(models).map((model) =>
					model.initModel(this.sequelize),
				),
			);
			Object.values(models)
				.filter((model) => typeof model.associate === 'function')
				.forEach((model) => model.associate(models));

			console.log('Connection has been established successfully.');
		} catch (error) {
			logger.error('Unable to connect to the database:', error);
		}
	}
}

export default new Database();
