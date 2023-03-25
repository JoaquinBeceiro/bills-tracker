export const getUserSession = () => JSON.parse(localStorage.getItem("user"));

export const setUserSession = (user) => {
  const userFromStorage = getUserSession();
  const newUser = {
    ...userFromStorage,
    ...user,
  };
  const userObject = JSON.stringify(newUser);
  localStorage.setItem("user", userObject);
};

export const deleteUserSession = () => {
  localStorage.removeItem("data");
  localStorage.removeItem("user");
};

export const setSheetData = (data) => {
  const dataObject = JSON.stringify(data);
  localStorage.setItem("data", dataObject);
};

export const getSheetData = () => JSON.parse(localStorage.getItem("data"));
