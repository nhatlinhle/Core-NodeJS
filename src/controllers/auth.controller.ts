import jwt from 'jsonwebtoken';
import { t as lang } from 'i18next';
import { NextFunction, Request, Response } from 'express';
import { apiSuccess } from '../utils/response.util';
import { UserService } from '../services/user.service';
import { managerSessionDataInterface } from '../interfaces/auth.interface';

const service = new UserService();

export default class AuthController {
	public async login(req: Request, res: Response, next: NextFunction) {
		try {
			let expiresIn = '24h';
			let loggedUser: managerSessionDataInterface | null = null;
			const jwtScret: string = process.env.JWT_SCRET || 'scret';
			const { email, password } = req.body;
			if (req.body.remember_me) {
				expiresIn = '30d';
			}
			loggedUser = await service.userLogin(email, password, expiresIn);
			const token = jwt.sign(loggedUser, jwtScret, { expiresIn });
			const response = {
				...loggedUser,
				access_token: token,
			};

			return apiSuccess(res, next, response, lang('auth.login.success'));
		} catch (error) {
			next(error);
		}
	}
}
