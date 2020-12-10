import { getConnection } from './connection';
import { QueryBuilder } from './query-builder';
import { guessTableName } from './utils';

export class Model {
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
}
