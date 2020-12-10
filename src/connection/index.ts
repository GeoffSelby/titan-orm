import { Manager } from './manager';

const manager = new Manager();

export const createConnection = async (config: any) => {
  const connection = manager.add('default', config);

  await connection.connect();

  return connection;
};

export const getConnection = (name = 'default') => {
  return manager.get(name);
};
