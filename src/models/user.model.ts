import { Model, DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize/types';
import * as DatabaseModel from '.';
import { UserRole, UserStatus } from '../constants/database.constant';
import {
	UserAttributes,
	UserCreationAttributes,
} from '../interfaces/user.interface';

class User extends Model<UserAttributes, UserCreationAttributes> {
	public readonly id!: number;
	public readonly email!: string;
	public readonly password!: string;
	public readonly role!: number;
	public readonly verified!: boolean;
	public readonly status!: number;
	public readonly created_at!: Date;
	public readonly updated_at!: Date;

	static initModel(sequelize: Sequelize) {
		return User.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				email: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				role: {
					type: DataTypes.TINYINT,
					allowNull: false,
					defaultValue: UserRole.USER,
				},
				verified: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
					defaultValue: false,
				},
				status: {
					type: DataTypes.TINYINT,
					allowNull: false,
					defaultValue: UserStatus.ACTIVE,
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
				tableName: 'users',
				modelName: 'User',
				timestamps: true,
				createdAt: 'created_at',
				updatedAt: 'updated_at',
				name: {
					singular: 'user',
					plural: 'users',
				},
			},
		);
	}

	static associate(models: typeof DatabaseModel) {
		this.hasMany(models.Comment, { foreignKey: 'user_id' });
		this.hasMany(models.Blog, { foreignKey: 'user_id' });
		this.hasMany(models.Comment, { foreignKey: 'user_id' });
	}
}

export default User;
