import { SET_USER, CLEAR_USER } from "../type";

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const clearUser = () => (dispatch) => {
  dispatch({
    type: CLEAR_USER,
    payload: {},
  });
};
