import axiosInstance from "../../../helpers/axiosInstance";
import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
} from "../../actionTypes";

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFail = (error) => {
  if (error) {
    if (error.data.status === 400 || 401) {
      return {
        type: LOGIN_ERROR,
        payload: "Invalid Credentials",
      };
    } else {
      return {
        type: LOGIN_ERROR,
        payload: error ? error.data.message : "COULD NOT CONNECT",
      };
    }
  } else {
    return {
      type: LOGIN_ERROR,
      payload: "Failed to Connect",
    };
  }
};

export const login = ({ email, password }) => (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });

  axiosInstance()
    .post("/signin", { email, password })
    .then((response) => {
      // localStorage.token = res.data.token;
      localStorage.setItem('user', JSON.stringify({ token: response.data.token, userid: response.data.userid }));
      dispatch(loginSuccess(response.data));
    })
    .catch((err) => {
      console.log(err)
      dispatch(loginFail(err.response));
    });
};

export const userLogout = () => {
  localStorage.removeItem("user");
  return {
    type: LOGOUT_USER,
  };
};

export const authCheckState = (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    dispatch(loginSuccess(user));
  } else {
    dispatch(userLogout());
  }
};