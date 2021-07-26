export const setUserSession = (user) => {
  const userObject = JSON.stringify(user);
  localStorage.setItem("user", userObject);
};

export const getUserSession = () => JSON.parse(localStorage.getItem("user"));

export const deleteUserSession = () => localStorage.removeItem("user");
