import React, { useContext, useEffect } from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import NavBar from "./components/Navigation/NavBar/NavBar";
import Routes from "./Routes";
import { GlobalContext } from "./context/Provider";
import { authCheckState } from "./context/actions/auth/login";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const ltrTheme = createMuiTheme({ direction: "ltr" });
const rtlTheme = createMuiTheme({ direction: "rtl" });

export const DirectionContext = React.createContext();

const FishCompetitionApp = () => {
  const { direction, languageChangeHandler, authDispatch, authState: { auth: { token } } } = useContext(GlobalContext);

  const authenticated = token !== null ? true : false;

  useEffect(() => {
    authCheckState(authDispatch);
  }, [authDispatch]);

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={direction === "rtl" ? rtlTheme : ltrTheme}>
        <NavBar
          isAuthenticated={authenticated}
          changeLanguage={languageChangeHandler}
          direction={direction}
        />
        <Routes isAuthenticated={authenticated} />
      </ThemeProvider>
    </StylesProvider>
  );
};

export default FishCompetitionApp;
