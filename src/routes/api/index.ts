import { Router } from 'express';
import commentRouter from './comment.router';
import authRoutes from './auth.router';
import AuthenticationMiddleware from '../../middlewares/authenticate.middleware';

class apiRoutes {
	public router: Router;
	protected authMiddleware: AuthenticationMiddleware;

	constructor() {
		this.router = Router();
		this.authMiddleware = new AuthenticationMiddleware();
		this.registerRoutes();
	}

	protected registerRoutes(): void {
		this.router.use(
			'/comment',
			this.authMiddleware.handle,
			commentRouter.router,
		);
		this.router.use('/auth', authRoutes.router);
	}
}

export default new apiRoutes();
