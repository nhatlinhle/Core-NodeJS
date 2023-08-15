import jwt from 'jsonwebtoken';
import { t as lang } from 'i18next';
import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/errror.util';
import { authUserInterface } from '../interfaces/auth.interface';

export default class AuthenticationMiddleware {
	public async handle(req: Request, res: Response, next: NextFunction) {
		try {
			const jwtScret: string = process.env.JWT_SCRET || 'scret';
			const token = req.header('Authorization')?.replace('Bearer ', '');
			if (!token) {
				throw new AppError(
					HttpStatusCode.Forbidden,
					lang('auth.unauth'),
				);
			}
			res.locals.user = jwt.verify(token, jwtScret) as authUserInterface;

			next();
		} catch (error) {
			next(error);
		}
	}
}
