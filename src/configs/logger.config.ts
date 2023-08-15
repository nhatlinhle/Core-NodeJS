import winston, { format } from 'winston';

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		format.combine(format.errors({ stack: true })),
		format.timestamp(),
		format.prettyPrint(),
	),
	defaultMeta: { service: 'user-service' },
	transports: [
		new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error',
		}),
	],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
	);
}

export default logger;
