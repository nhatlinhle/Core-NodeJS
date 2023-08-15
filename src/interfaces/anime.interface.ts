import { Optional } from 'sequelize';

interface AnimeAttributes {
	id: number;
	created_at: Date;
	updated_at: Date;
}

type AnimeCreationAttributes = Optional<
	AnimeAttributes,
	'id' | 'created_at' | 'updated_at'
>;

export { AnimeAttributes, AnimeCreationAttributes };
