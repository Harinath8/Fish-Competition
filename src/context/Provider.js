import React, { createContext, useReducer, useState, useCallback } from "react";
import i18next from "i18next";
import { DIRECTIONS } from "react-with-direction/dist/DirectionProvider";

import auth from "./reducers/auth";
import authInitialState from "./intialstates/authInitialState";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);

  const [direction, setDirection] = useState(DIRECTIONS.LTR);

  const languageChangeHandler = useCallback(() => {
    let lang = "ar";
    if (i18next.language === "ar") lang = "en";
    i18next.changeLanguage(lang);

    if (lang === "ar") {
      setDirection(DIRECTIONS.RTL);
    } else {
      setDirection(DIRECTIONS.LTR);
    }
  }, []);


  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        direction,
        languageChangeHandler
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
