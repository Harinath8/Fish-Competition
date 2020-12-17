import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { userLogout } from "../../context/actions/auth/login";
import { GlobalContext } from "../../context/Provider";

const Logout = () => {
  const { authDispatch } = useContext(GlobalContext);

  useEffect(() => {
    authDispatch(userLogout());
  }, [authDispatch]);

  return <Redirect to="/" />;
};

export default Logout;
