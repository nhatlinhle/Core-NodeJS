import { Optional } from 'sequelize';

interface CommentAttributes {
	id: number;
	user_id: number;
	commentable_id: number;
	commentable_type: string;
	content: string;
	parent_id?: number;
	created_at: Date;
	updated_at: Date;
}

type CommentCreationAttributes = Optional<
	CommentAttributes,
	'id' | 'parent_id' | 'created_at' | 'updated_at'
>;

export { CommentAttributes, CommentCreationAttributes };
