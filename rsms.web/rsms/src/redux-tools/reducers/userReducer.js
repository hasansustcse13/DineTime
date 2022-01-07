import { SET_USER, CLEAR_USER } from "../type";

const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        user: { ...state.user, ...action.payload },
      };
    case CLEAR_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default userReducer;
