const addLeftValue = (value) => (`${value}`.length === 1 ? `0${value}` : value);

export const todayDate = () => {
  const nDate = new Date();
  const day = addLeftValue(nDate.getDate());
  const month = addLeftValue(nDate.getMonth());
  const year = nDate.getFullYear();
  return `${year}-${month}-${day}`;
};

export const dateParser = (date) => {
  const splitDate = date.split("/");
  const newDate = new Date(`${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`);
  return newDate;
};
