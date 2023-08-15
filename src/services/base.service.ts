import {
	Attributes,
	Model,
	ModelStatic,
	WhereAttributeHash,
	WhereOptions,
} from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';

export abstract class BaseService<T extends Model> {
	constructor(protected model: ModelStatic<T>) {}

	public async all(conditions: WhereAttributeHash): Promise<T[]> {
		return await this.model.findAll({
			where: conditions,
		});
	}

	public async find(id: number): Promise<T | null> {
		return await this.model.findByPk(id);
	}

	public async create(
		data: MakeNullishOptional<T['_creationAttributes']>,
	): Promise<T> {
		return await this.model.create(data);
	}

	public async update(
		conditions: WhereAttributeHash,
		data: MakeNullishOptional<T['_creationAttributes']>,
	): Promise<{ affectedCount: number; affectedRows: T[] }> {
		const [affectedCount, affectedRows] = await this.model.update(data, {
			where: conditions as WhereOptions<Attributes<T>>,
			returning: true,
		});

		return { affectedCount, affectedRows };
	}

	public async delete(conditions: WhereAttributeHash): Promise<number> {
		return await this.model.destroy({
			where: conditions as WhereOptions<Attributes<T>>,
		});
	}
}
