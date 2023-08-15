import { Optional } from 'sequelize';

interface BlogAttributes {
	id: number;
	user_id: number;
	title: string;
	slug: string;
	content: string;
	status: number;
	created_at: Date;
	updated_at: Date;
}

type BlogCreationAttributes = Optional<
	BlogAttributes,
	'id' | 'created_at' | 'updated_at'
>;

export { BlogAttributes, BlogCreationAttributes };
