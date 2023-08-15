import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { transValidate } from '../utils/string.util';
import { CommentAttributes } from '../interfaces/comment.interface';
import { HttpStatusCode } from 'axios';
import { AppError } from '../utils/errror.util';

const createCommentSchema = Joi.object<CommentAttributes>({
	commentable_id: Joi.number().required().label('ID'),
	commentable_type: Joi.string().required().label('Type'),
	content: Joi.string().required(),
	parent_id: Joi.number(),
});

const createOptions = {
	messages: {
		'number.base': 'comment.create.commentable_id.number',
		'any.required': '{{#label}} is required',
	},
	abortEarly: true,
};

export const validateCreateComment = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	try {
		const { error } = createCommentSchema.validate(req.body, createOptions);
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
