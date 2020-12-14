import React, { Fragment } from "react";
import i18next from "i18next";
import DirectionProvider from "react-with-direction/dist/DirectionProvider";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
}));

const NavBar = ({ changeLanguage, direction, language }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  // console.log(i18next);
  // console.log(i18next.language);

  // console.log(language);

  let renderMenu = (
    <Fragment>
      <Button color="inherit" onClick={() => changeLanguage()}>
        {i18next.language === "en" ? "عربى" : "Enlish"}
      </Button>
      <Link to="/signup" className={classes.link}>
        <Button color="inherit">{t("Navbar.SignUp")}</Button>
      </Link>
      <Link to="/signin" className={classes.link}>
        <Button color="inherit">{t("Navbar.SignIn")}</Button>
      </Link>
      <Link to="/profile" className={classes.link}>
        <Button color="inherit">{t("Navbar.Profile")}</Button>
      </Link>
    </Fragment>
  );

  return (
    <DirectionProvider direction={direction}>
      <AppBar>
        <Toolbar>
          <Link to="/home" className={classes.link}>
            <Typography variant="h6" noWrap>
            {t("Navbar.AppName")}
            </Typography>
          </Link>
          <div className={classes.grow} />
          {renderMenu}
        </Toolbar>
      </AppBar>
    </DirectionProvider>
  );
};

export default NavBar;
