import { Connection, ConnectionConfig } from './connection';

export type ConnectionNode = {
  name: string;
  connection: Connection;
};

export class Manager {
  private connections = new Map<string, ConnectionNode>();

  public has(name: string): boolean {
    return this.connections.has(name);
  }

  public get(name: string): Connection | undefined {
    if (!this.has(name)) {
      return undefined;
    }
    const { connection } = this.connections.get(name);

    return connection;
  }

  public add(name: string, config: ConnectionConfig): Connection {
    if (this.has(name)) {
      return;
    }

    this.connections.set(name, {
      name,
      connection: new Connection(name, config),
    });

    return this.get(name);
  }

  public async connect(name: string): Promise<void> {
    if (!this.has(name)) {
      throw new Error(`Cannot connect to unregistered connection ${name}`);
    }

    const connection = this.get(name);

    if (!connection.isConnected) {
      await connection.connect();
    }
  }

  public isConnected(name: string): boolean {
    const connection = this.get(name);

    if (!connection) {
      return false;
    }

    return !!connection.isConnected;
  }
}
