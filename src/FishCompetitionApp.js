import React, { useContext } from "react";
import i18next from "i18next";
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

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const ltrTheme = createMuiTheme({ direction: "ltr" });
const rtlTheme = createMuiTheme({ direction: "rtl" });

export const DirectionContext = React.createContext();

const FishCompetitionApp = () => {
  const { direction, languageChangeHandler } = useContext(GlobalContext);

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={direction === "rtl" ? rtlTheme : ltrTheme}>
        <NavBar
          changeLanguage={languageChangeHandler}
          language={i18next.language}
          direction={direction}
        />
        <Routes />
      </ThemeProvider>
    </StylesProvider>
  );
};

export default FishCompetitionApp;
