export type ObjectType<T> = { new (): T };

export const guessTableName = (Model: any) => {
  return `${Model.name.toLowerCase()}s`;
};
