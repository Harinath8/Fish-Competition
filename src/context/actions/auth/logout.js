import { LOGOUT_USER } from "../../actionTypes";

export default (history) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT_USER,
  });
  history.push("/signin");
};
