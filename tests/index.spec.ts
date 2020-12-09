import { hello } from './../src';

describe('index', () => {
  it('should greet the world', () => {
    const actual = hello();

    expect(actual).toBe('Hello, World!');
  });

  it('should greet by name', () => {
    const actual = hello('Moto');

    expect(actual).toBe('Hello, Moto!');
  });
});
