import { Connection } from './connection/connection';

export class QueryBuilder {
  constructor(private connection: Connection) {}

  public for(tableName: string) {
    return this.connection.client.table(tableName);
  }
}
