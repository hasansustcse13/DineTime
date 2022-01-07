import Cookies from "js-cookie";

const tokenName = "token";

const isAuthorized = (user) => {
  return Cookies.get(tokenName) && user && Object.keys(user).length > 0;
};

const saveToken = (token) => Cookies.set(tokenName, token);

const getToken = () => Cookies.get(tokenName);

const deleteToken = () => Cookies.remove(tokenName);

export default {
  isAuthorized,
  saveToken,
  getToken,
  deleteToken,
};
