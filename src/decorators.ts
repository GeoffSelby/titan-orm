import 'reflect-metadata';

export const column = (options: any = {}) => {
  return (target, property) => {
    const Model = target.constructor;

    Model.columnDefinitions.set(property, options);
  };
};
