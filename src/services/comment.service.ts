import { Comment } from '../models';
import { BaseService } from './base.service';

class CommentService extends BaseService<Comment> {
	protected model: typeof Comment;

	constructor() {
		super(Comment);
		this.model = Comment;
	}
}

export default CommentService;
