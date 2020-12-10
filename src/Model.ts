import { getConnection } from './connection';
import { QueryBuilder } from './query-builder';
import { ObjectType, guessTableName } from './utils';

export class BaseModel {
  public static tableName: string;

  public static columnDefinitions = new Map<string, any>();

  public static get connection() {
    return getConnection();
  }

  public static query() {
    return new QueryBuilder(this.connection).for(
      this.tableName || guessTableName(this)
    );
  }

  public static async create<M extends BaseModel>(
    this: ObjectType<M>,
    attributes: Partial<M>
  ): Promise<M> {
    const row = new this().fill(attributes);

    return row.save();
  }

  public fill(attributes: Partial<this>): this {
    const Model = this.constructor as typeof BaseModel;

    Object.entries(attributes).forEach(([key, value]) => {
      if (Model.columnDefinitions.has(key)) {
        this[key] = value;
      }
    });

    return this;
  }

  public async save(): Promise<this> {
    return Promise.resolve(this);
  }
}
