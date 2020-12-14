import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DirectionProvider from "react-with-direction/dist/DirectionProvider";
import { makeStyles, Paper } from "@material-ui/core";

// import i18n from '../../translations/i18n'
import { login } from "../../context/actions/auth/login";
import { GlobalContext } from "../../context/Provider";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { checkValidity } from "../../utils/validations";
import { updateObject } from "../../utils/updateObject";

const useStyles = makeStyles((theme) => ({
  maindiv: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginTop: theme.spacing(8),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 10px",
    marginBottom: theme.spacing(6),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState = {
  username: {
    value: "",
    validation: {
      required: true,
      isUserName: true,
      minLength: 3,
      maxLength: 15,
    },
    validationMsg: "Name or Email Required!",
    valid: false,
    touched: false,
  },
  password: {
    value: "",
    validation: {
      required: true,
      isPassword: true,
      minLength: 6,
      maxLength: 16,
    },
    validationMsg: "Password Required!",
    valid: false,
    touched: false,
  },
};

const SignIn = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { direction, authDispatch } = useContext(GlobalContext);

  const [loginForm, setLoginForm] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    // event.preventDefault();
  };

  const inputChangedHandler = (event) => {
    // console.log(event.target.name, event.target.value);
    const validation = checkValidity(event.target.value, loginForm[event.target.name].validation, t);

    const updatedDetails = updateObject(loginForm, {
      [event.target.name]: updateObject(loginForm[event.target.name], {
        value: event.target.value,
        valid: validation.valid,
        validationMsg: validation.validationMsg,
        touched: true,
      }),
    });
    setLoginForm(updatedDetails);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // i18n.on('languageChanged', language => {
      
    // })

    if (!loginForm.username.valid && !loginForm.password.valid) {
        const updatedForm = {
            ...loginForm,
            username: { ...loginForm.username, touched: true, validationMsg: t("SignIn.Validations.NameOrEmail") },
            password: { ...loginForm.password, touched: true, validationMsg: t("SignIn.Validations.Password") }
        }
        setLoginForm(updatedForm);
    }

    // login({ username: loginForm.username.value, password: loginForm.password.value })(authDispatch);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.maindiv}>
      <CssBaseline />
      <Paper elevation={12} className={classes.paper}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            {t("SignIn.InputFields.SignIn")}
          </Typography>

          <DirectionProvider direction={direction}>
            <form className={classes.form} onSubmit={submitHandler} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="username"
                label={t("SignIn.InputFields.NameOrEmail")}
                name="username"
                autoComplete="username"
                autoFocus
                error={!loginForm.username.valid && loginForm.username.touched}
                onChange={inputChangedHandler}
                helperText={
                  !loginForm.username.valid && loginForm.username.touched
                    ? loginForm.username.validationMsg
                    : null
                }
              />
              <PasswordInput
                valid={loginForm.password.valid}
                touched={loginForm.password.touched}
                showPassword={showPassword}
                errorMsg={loginForm.password.validationMsg}
                setPassword={inputChangedHandler}
                togglePassword={handleClickShowPassword}
                mouseDownPassword={handleMouseDownPassword}
                translate={t("SignIn.InputFields.Password")}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {t("SignIn.InputFields.SignIn")}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgotPassword">{`${t("SignIn.InputFields.ForgotPassword")}`}</Link>
                </Grid>
              </Grid>
            </form>
          </DirectionProvider>
        </div>
      </Paper>
    </Container>
  );
};

export default SignIn;
