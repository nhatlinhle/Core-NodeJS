import { Router } from 'express';
import { validateLogin } from '../../validators/auth.validator';
import AuthController from '../../controllers/auth.controller';

class authRoutes {
	public router: Router;
	protected controller: AuthController;

	constructor() {
		this.router = Router();
		this.controller = new AuthController();
		this.registerRoutes();
	}

	protected registerRoutes(): void {
		this.router.post('/login', validateLogin, this.controller.login);
	}
}

export default new authRoutes();
