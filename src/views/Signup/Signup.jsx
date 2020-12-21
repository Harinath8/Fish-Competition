import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import DirectionProvider from "react-with-direction/dist/DirectionProvider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { signupFormInitialState } from "../../utils/initialStates";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { checkValidity } from "../../utils/validations";
import { updateObject } from "../../utils/updateObject";
import { GlobalContext } from "../../context/Provider";
import { register } from "../../context/actions/auth/register";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  // const history = useHistory();
  
  const { t } = useTranslation();
  const { direction, authDispatch, authState: { auth: { data, error } } } = useContext(GlobalContext);

  const [signupForm, setSignupForm] = useState(signupFormInitialState.signupForm);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    // event.preventDefault();
  };

  const inputChangedHandler = (event) => {
    // console.log(event.target.name, event.target.value);
    const validation = checkValidity(event.target.value, signupForm[event.target.name].validation, t);

    const updatedSignupForm = updateObject(signupForm, {
      [event.target.name]: updateObject(signupForm[event.target.name], {
        value: event.target.value,
        valid: validation.valid,
        validationMsg: validation.validationMsg,
        touched: true,
      }),
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedSignupForm) {
      
      if(updatedSignupForm[inputIdentifier].hasOwnProperty("valid")){
        formIsValid = updatedSignupForm[inputIdentifier].valid && formIsValid;
      }
    }

    setSignupForm({ ...updatedSignupForm, formIsValid: formIsValid});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!signupForm.formIsValid) {
        const updatedForm = {
            ...signupForm,
            name: { ...signupForm.name, touched: true },
            phoneNo: { ...signupForm.phoneNo, touched: true },
            email: { ...signupForm.email, touched: true },
            civilId: { ...signupForm.civilId, touched: true },
            password: { ...signupForm.password, touched: true }
        }
        setSignupForm(updatedForm);
    }

    if(signupForm.formIsValid) {
      register({
        username: signupForm.name.value,
        password: signupForm.password.value,
        email: signupForm.email.value,
        civilid: signupForm.civilId.value,
        telephone: signupForm.phoneNo.value,
        roles: signupForm.roles
      })(authDispatch);
    }
  }

  useEffect(() => {
    // if (data && data.status === 201) {
    //   history.push("/signin");
    // }
    if(data) {
      setSignupForm(signupFormInitialState.signupForm);
    }
  }, [data]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          {t("SignUp.InputFields.SignUp")}
        </Typography>

        <Typography component="h1" variant="h5">
          {error ? error : null}
          {data ? data.message : null}
        </Typography>

        <DirectionProvider direction={direction}>
          <form className={classes.form} onSubmit={submitHandler} noValidate>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  // helperText="Please specify the first name"
                  label={t("SignUp.InputFields.Name")}
                  name="name"
                  onChange={(event) => {
                    inputChangedHandler(event);
                  }}
                  error={!signupForm.name.valid && signupForm.name.touched}
                  helperText={
                    !signupForm.name.valid && signupForm.name.touched
                      ? signupForm.name.validationMsg
                      : null
                  }
                  required
                  value={signupForm.name.value}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label={t("SignUp.InputFields.EmailAddress")}
                  name="email"
                  onChange={inputChangedHandler}
                  error={!signupForm.email.valid && signupForm.email.touched}
                  // helperText={!signupForm.email.valid && signupForm.email.touched ? t("SignUp.Validations.EmailAddress") : null}
                  helperText={!signupForm.email.valid && signupForm.email.touched ? signupForm.email.validationMsg : null}
                  required
                  value={signupForm.email.value}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label={t("SignUp.InputFields.PhoneNumber")}
                  name="phoneNo"
                  required
                  onChange={inputChangedHandler}
                  error={
                    !signupForm.phoneNo.valid && signupForm.phoneNo.touched
                  }
                  helperText={
                    !signupForm.phoneNo.valid && signupForm.phoneNo.touched
                      ? signupForm.phoneNo.validationMsg
                      : null
                  }
                  // helperText={
                  //   !signupForm.phoneNo.valid && signupForm.phoneNo.touched
                  //     ? t("SignUp.Validations.PhoneNumber")
                  //     : null
                  // }
                  // type="number"
                  value={signupForm.phoneNo.value}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label={t("SignUp.InputFields.CivilID")}
                  name="civilId"
                  onChange={inputChangedHandler}
                  error={
                    !signupForm.civilId.valid && signupForm.civilId.touched
                  }
                  helperText={
                    !signupForm.civilId.valid && signupForm.civilId.touched
                      ? t("SignUp.Validations.CivilID")
                      : null
                  }
                  required
                  value={signupForm.civilId.value}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <PasswordInput
                  name="password"
                  id="outlined-adornment-password"
                  passwordValue={signupForm.password.value}
                  valid={signupForm.password.valid}
                  touched={signupForm.password.touched}
                  showPassword={showPassword}
                  errorMsg={signupForm.password.validationMsg}
                  setPassword={inputChangedHandler}
                  togglePassword={handleClickShowPassword}
                  mouseDownPassword={handleMouseDownPassword}
                  translate={t("SignUp.InputFields.Password")}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("SignUp.InputFields.SignUp")}
            </Button>

            <Grid container>
              <Grid item>
                <Link to="/signin">{t("SignUp.InputFields.SignIn")}</Link>
              </Grid>
            </Grid>
          </form>
        </DirectionProvider>
      </div>
    </Container>
  );
}
