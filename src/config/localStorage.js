export const setUserSession = (user) => {
  const userObject = JSON.stringify(user);
  localStorage.setItem("user", userObject);
};

export const getUserSession = () => JSON.parse(localStorage.getItem("user"));

export const deleteUserSession = () => {
  localStorage.removeItem("data");
  localStorage.removeItem("user");
}


export const setSheetData = (data) => {
  const dataObject = JSON.stringify(data);
  localStorage.setItem("data", dataObject);
};

export const getSheetData = () => JSON.parse(localStorage.getItem("data"));