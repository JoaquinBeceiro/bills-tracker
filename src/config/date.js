const addLeftValue = value => (`${value}`.length === 1 ? `0${value}` : value);

export const todayDate = () => {
  const nDate = new Date();
  const day = addLeftValue(nDate.getDate());
  const month = addLeftValue(nDate.getMonth());
  const year = nDate.getFullYear();
  return `${year}-${month}-${day}`;
};
