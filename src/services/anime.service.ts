import { Anime, Comment } from '../models';
import { BaseService } from './base.service';
import { CommentAttributes } from '../interfaces/comment.interface';

class AnimeService extends BaseService<Anime> {
	protected model: typeof Anime;

	constructor() {
		super(Anime);
		this.model = Anime;
	}

	public async createComment(
		id: Anime['id'],
		params: CommentAttributes,
	): Promise<Comment> {
		const [anime] = await this.model.findOrCreate({
			where: { id },
			defaults: { id },
		});
		params.commentable_id = anime.id;

		return Comment.create(params);
	}
}

export default AnimeService;
