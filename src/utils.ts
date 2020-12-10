export const guessTableName = (Model: any) => {
  return `${Model.name.toLowerCase()}s`;
};
