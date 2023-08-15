import { NextFunction, Response } from 'express';

export const apiSuccess = (
	response: Response,
	next: NextFunction,
	data: any,
	message?: string | null,
): void => {
	response.locals.data = data;
	response.locals.message = message;

	return next();
};
