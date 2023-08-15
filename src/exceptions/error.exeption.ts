import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';
import { env } from '../configs';

interface ErrorInterface extends Error {
	statusCode?: number;
}

class ErrorHandler {
	static handle(
		error: ErrorInterface,
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		const responseData = {
			code: error.statusCode || 500,
			message: error.message || 'Internal Server Error',
		};
		let stack: any = env.app.node_env === 'production' ? '' : error.stack;
		if (env.app.node_env !== 'production') {
			if (stack) {
				const errorRegex = /^(\w+):\s(.+)\n([\s\S]+)/;
				const match = stack.match(errorRegex);

				if (match) {
					const [, errorType, errorMessage, stackTrace] = match;

					stack = {
						type: errorType,
						message: errorMessage,
						stackTrace: stackTrace
							.split('\n')
							.map((line: string) => line.trim()),
					};
				}
			}
			if (error instanceof ValidationError) {
				error.errors.map((e) => {
					responseData.message = e.message;
					stack = e;
				});
			}

			return res.status(responseData.code).json({
				...responseData,
				stack,
			});
		}

		return res.status(responseData.code).json(responseData);
	}
}

export default ErrorHandler;
