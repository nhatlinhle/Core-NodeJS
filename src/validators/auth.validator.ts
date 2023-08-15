import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { transValidate } from '../utils/string.util';
import { HttpStatusCode } from 'axios';
import { AppError } from '../utils/errror.util';
import { loginAttributes } from '../interfaces/auth.interface';

const loginSchema = Joi.object<loginAttributes>({
	email: Joi.string().required().email().label('Email'),
	password: Joi.string().required().label('Password'),
	remember_me: Joi.boolean().label('Remember me'),
});

const createOptions = {
	messages: {
		'any.required': 'error.required',
	},
	abortEarly: true,
};

export const validateLogin = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	try {
		const { error } = loginSchema.validate(req.body, createOptions);
		if (error) {
			throw new AppError(
				HttpStatusCode.BadRequest,
				transValidate(error.details[0]),
			);
		}
		return next();
	} catch (error) {
		next(error);
	}
};
