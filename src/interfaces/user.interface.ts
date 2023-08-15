import { Optional } from 'sequelize';

interface UserAttributes {
	id: number;
	email: string;
	password: string;
	role: number;
	verified: boolean;
	status: number;
	created_at: Date;
	updated_at: Date;
}

type UserCreationAttributes = Optional<
	UserAttributes,
	'id' | 'created_at' | 'updated_at'
>;

export { UserAttributes, UserCreationAttributes };
