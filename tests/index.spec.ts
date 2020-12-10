import { createConnection, Model, column } from '../src';

describe('Titan ORM', () => {
  createConnection({
    client: 'pg',
    connection: 'postgres://josh:@127.0.0.1:5432/defaultdb',
  });

  it('should work', async () => {
    class Example extends Model {
      @column()
      key: string;

      @column()
      value: string;
    }

    const result = await Example.query();

    console.log(result);
  });
});
