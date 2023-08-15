import { Model, DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize/types';
import * as DatabaseModel from '.';
import {
	CommentAttributes,
	CommentCreationAttributes,
} from '../interfaces/comment.interface';

class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
	public readonly id!: number;
	public readonly user_id!: number;
	public readonly commentable_id!: number;
	public readonly commentable_type!: string;
	public readonly content!: string;
	public readonly parent_id?: number;
	public readonly created_at!: Date;
	public readonly updated_at!: Date;

	static initModel(sequelize: Sequelize) {
		return Comment.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				user_id: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				commentable_id: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				commentable_type: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				content: {
					type: DataTypes.TEXT,
					allowNull: false,
				},
				parent_id: DataTypes.INTEGER,
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
				tableName: 'comments',
				modelName: 'Comment',
				timestamps: true,
				createdAt: 'created_at',
				updatedAt: 'updated_at',
				name: {
					singular: 'comment',
					plural: 'comments',
				},
			},
		);
	}

	static associate(models: typeof DatabaseModel) {
		this.belongsTo(models.User, { foreignKey: 'user_id' });
		this.belongsTo(models.Blog, {
			foreignKey: 'commentable_id',
			constraints: false,
		});
		this.belongsTo(models.Anime, {
			foreignKey: 'commentable_id',
			constraints: false,
		});
	}
}

export default Comment;
