import { Router } from 'express';
import { validateCreateComment } from '../../validators/comment.validator';
import CommentController from '../../controllers/comment.controller';

class commentRoutes {
	public router: Router;
	protected controller: CommentController;

	constructor() {
		this.router = Router();
		this.controller = new CommentController();
		this.registerRoutes();
	}

	protected registerRoutes(): void {
		this.router.get('/:id', this.controller.index);
		this.router.post(
			'/store',
			validateCreateComment,
			this.controller.store,
		);
	}
}

export default new commentRoutes();
