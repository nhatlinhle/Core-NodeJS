import { HttpStatusCode } from 'axios';
import { AppError } from '../utils/errror.util';
import { User } from '../models';
import { BaseService } from './base.service';
import { compareHash } from '../utils/encryption.util';
import { managerSessionDataInterface } from 'src/interfaces/auth.interface';

export class UserService extends BaseService<User> {
	protected model: typeof User;

	constructor() {
		super(User);
		this.model = User;
	}

	public async userLogin(
		email: string,
		password: string,
		expiresIn: string,
	): Promise<managerSessionDataInterface> {
		const user = await this.model.findOne({
			where: { email },
		});

		if (!user) {
			throw new AppError(HttpStatusCode.Forbidden, 'Email mismatch');
		}
		const isMatch = await compareHash(password, user.password);

		if (!isMatch) {
			throw new AppError(HttpStatusCode.Forbidden, 'Password invalid!');
		}

		return {
			id: user.id,
			email: user.email,
			expires: expiresIn,
		};
	}
}
