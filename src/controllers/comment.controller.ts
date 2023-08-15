import { NextFunction, Request, Response } from 'express';
import CommentService from '../services/comment.service';
import AnimeService from '../services/anime.service';
import { Comment } from '../models';
import { CommentType } from '../constants/database.constant';
import { apiSuccess } from '../utils/response.util';
import { t as lang } from 'i18next';

const service = new CommentService();
const animeService = new AnimeService();

export default class CommentController {
	public async index(req: Request, res: Response, next: NextFunction) {
		try {
			const conditions = {
				commentable_id: req.params.id,
				commentable_type: CommentType.includes(req.query.type as string)
					? req.query.type
					: 'anime',
			};

			const listComments = await service.all(conditions);

			return apiSuccess(res, next, listComments);
		} catch (error) {
			next(error);
		}
	}

	public async store(req: Request, res: Response, next: NextFunction) {
		try {
			let comment: Comment;
			const params = {
				...req.body,
				user_id: 1,
			} as Comment;
			if (params.commentable_type == 'anime') {
				comment = await animeService.createComment(
					req.body.commentable_id,
					params,
				);
			} else {
				comment = await service.create(params);
			}

			return apiSuccess(
				res,
				next,
				comment,
				lang('comment.create.success'),
			);
		} catch (error) {
			next(error);
		}
	}
}
