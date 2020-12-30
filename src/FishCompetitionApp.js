import React, { useContext, useEffect, useState } from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";

import NavBar from "./components/Navigation/NavBar/NavBar";
import Routes from "./routes/Routes";
import UserRoutes from "./routes/UserRoutes";
import { GlobalContext } from "./context/Provider";
import { authCheckState } from "./context/actions/auth/login";
import SideDrawer from "./components/Navigation/SideDrawer/SideDrawer";

const useStyles = makeStyles(() => ({
  wrapper: {
    paddingTop: 58,
  },
}));

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const ltrTheme = createMuiTheme({ direction: "ltr" });
const rtlTheme = createMuiTheme({ direction: "rtl" });

export const DirectionContext = React.createContext();

const FishCompetitionApp = () => {
  const classes = useStyles();
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const { direction, languageChangeHandler, authDispatch, authState: { auth: { token } } } = useContext(GlobalContext);

  const authenticated = token !== null ? true : false;

  useEffect(() => {
    authCheckState(authDispatch);
  }, [authDispatch]);

  const sideDrawer = (open) => {
    setShowSideDrawer(open);
  };

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => {
      return !prevState.showSideDrawer;
    });
  };

  let routes = <Routes />
  if(authenticated) routes = <UserRoutes />

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={direction === "rtl" ? rtlTheme : ltrTheme}>
        <NavBar
          isAuthenticated={authenticated}
          changeLanguage={languageChangeHandler}
          direction={direction}
          drawerToggleClicked={sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={authenticated}
          open={showSideDrawer}
          sideDrawer={sideDrawer}
          opened={sideDrawerToggleHandler}
          closed={sideDrawerClosedHandler}
        />
        <div className={classes.wrapper}>{routes}</div>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default FishCompetitionApp;
