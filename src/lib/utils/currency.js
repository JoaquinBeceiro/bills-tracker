export const moneyToNumber = (value) =>
  parseInt(value.replace("$", "").replace(".", "").replace(",", ""));

export const formatMoney = (value) => {
  return Number(value.toFixed(1)).toLocaleString();
};
