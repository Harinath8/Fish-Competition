import axiosInstance from "../../../helpers/axiosInstance";
import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "../../actionTypes";

export const register = ({ username, password, email, civilid, telephone, roles }) => (dispatch) => {
  dispatch({
    type: REGISTER_LOADING,
  });

  axiosInstance()
    .post("/signup", { username, password, email, civilid, telephone, roles })
    .then((response) => {
      if(response.data.status === 201) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response.data,
        });
      } else if(response.data.status === 601) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response.data,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_ERROR,
        payload: err.response ? err.response.data.message : "COULD NOT CONNECT",
      });
    });
};