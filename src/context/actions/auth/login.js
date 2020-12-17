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
};

export const login = ({ email, password }) => (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });

  axiosInstance()
    .post("/signin", { email, password })
    .then((res) => {
      localStorage.token = res.data.token;
      dispatch(loginSuccess(res.data));
    })
    .catch((err) => {
      dispatch(loginFail(err.response));
    });
};

export const userLogout = () => {
  localStorage.removeItem("token");
  return {
    type: LOGOUT_USER,
  };
};

export const authCheckState = (dispatch) => {
  // const employee = localStorage.getItem('employee');
  // const user = JSON.parse(localStorage.getItem('token'))
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(userLogout());
  } else {
    dispatch(loginSuccess({ token }));
  }
};
