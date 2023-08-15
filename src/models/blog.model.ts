import { Model, DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize/types';
import * as DatabaseModel from '.';
import { BlogStatus } from '../constants/database.constant';
import {
	BlogAttributes,
	BlogCreationAttributes,
} from '../interfaces/blog.interface';

class Blog extends Model<BlogAttributes, BlogCreationAttributes> {
	public readonly id!: number;
	public readonly user_id!: number;
	public readonly title!: string;
	public readonly slug!: string;
	public readonly content!: string;
	public readonly status!: number;
	public readonly created_at!: Date;
	public readonly updated_at!: Date;

	static initModel(sequelize: Sequelize) {
		return Blog.init(
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
				title: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				slug: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				content: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				status: {
					type: DataTypes.TINYINT,
					allowNull: false,
					defaultValue: BlogStatus.ACTIVE,
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
				tableName: 'blogs',
				modelName: 'Blog',
				timestamps: true,
				createdAt: 'created_at',
				updatedAt: 'updated_at',
				name: {
					singular: 'blog',
					plural: 'blogs',
				},
			},
		);
	}

	static associate(models: typeof DatabaseModel) {
		this.belongsTo(models.User, { foreignKey: 'user_id' });
		this.hasMany(models.Comment, {
			foreignKey: 'commentable_id',
			constraints: false,
			scope: {
				commentable_type: 'blog',
			},
		});
	}
}

export default Blog;
