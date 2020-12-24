import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
} from "../actionTypes";

const auth = (state, { type, payload }) => {
  switch (type) {
    case REGISTER_LOADING:
    case LOGIN_LOADING:
      return {
        ...state,
        auth: {
          ...state.auth,
          error: false,
          loading: true,
        },
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          data: payload
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          data: payload,
          token: payload.token,
          userId: payload.userid
        },
      };

    case REGISTER_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          error: payload,
        },
      };
    case LOGOUT_USER:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          data: null,
          token: null,
        },
      };
    default:
      return state;
  }
};

export default auth;
