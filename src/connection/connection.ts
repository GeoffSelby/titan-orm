import { EventEmitter } from 'events';
import knex from 'knex';

export type ConnectionConfig = {
  client: 'pg';
  connection: string | knex.StaticConnectionConfig;
};

export class Connection extends EventEmitter {
  public client?: knex;
  public isConnected = false;

  constructor(private name: string, private config: ConnectionConfig) {
    super();
  }

  public async connect(): Promise<void> {
    try {
      this.client = await Promise.resolve(
        knex(Object.assign({}, this.config, { debug: false }))
      );
      this.isConnected = true;
      this.emit('connect', this);
    } catch (error) {
      this.emit('error', error, this);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      try {
        await this.client.destroy();
        this.isConnected = false;
        this.emit('disconnect', this);
      } catch (error) {
        this.emit('error', error, this);
      }
    }
  }
}
