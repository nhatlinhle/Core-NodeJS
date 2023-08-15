import { Model, DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize/types';
import * as DatabaseModel from '.';
import {
	AnimeAttributes,
	AnimeCreationAttributes,
} from '../interfaces/anime.interface';

class Anime extends Model<AnimeAttributes, AnimeCreationAttributes> {
	public readonly id!: number;
	public readonly created_at!: Date;
	public readonly updated_at!: Date;

	static initModel(sequelize: Sequelize) {
		return Anime.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				created_at: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: DataTypes.NOW,
				},
				updated_at: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: DataTypes.NOW,
				},
			},
			{
				sequelize,
				tableName: 'anime',
				modelName: 'Anime',
				timestamps: true,
				createdAt: 'created_at',
				updatedAt: 'updated_at',
				name: {
					singular: 'anime',
					plural: 'anime',
				},
			},
		);
	}

	static associate(models: typeof DatabaseModel) {
		this.hasMany(models.Comment, {
			foreignKey: 'commentable_id',
			constraints: false,
			scope: {
				commentable_type: 'anime',
			},
		});
	}
}

export default Anime;
