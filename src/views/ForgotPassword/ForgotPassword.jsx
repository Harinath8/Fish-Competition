import React, { useContext, useState } from "react";
import {
  Button,
    Container,
    CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import DirectionProvider from "react-with-direction/dist/DirectionProvider";

import { checkValidity } from "../../utils/validations";
import { GlobalContext } from "../../context/Provider";

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
    wrapper: {
        paddingTop: 48,
      },
  }));

const ForgotPassword = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { direction } = useContext(GlobalContext);

  const [email, setEmail] = useState({
    value: "",
    validation: {
      required: true,
      isEmail: true,
      maxLength: 20
    },
    validationMsg: "Email Required!",
    valid: false,
    touched: false,
  });

  const inputChangedHandler = (event) => {
    const validation = checkValidity(event.target.value, email.validation, t);

    setEmail({
      ...email,
      value: event.target.value,
      valid: validation.valid,
      validationMsg: validation.validationMsg,
      touched: true,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!email.valid) {
      setEmail({
        ...email,
        touched: true,
      });
    }

    if (email.valid) {
      
    }
  };

  return (
    <Container className={classes.wrapper} component="main" maxWidth="sm">
        <CssBaseline />
      <Typography variant="h3" gutterBottom marked="center" align="center">
      {t("ForgotPassword.ForgotPassword")}
      </Typography>
      <Typography variant="body2" align="center">
      {t("ForgotPassword.Description")}
      </Typography>

      <DirectionProvider direction={direction}>
        <form className={classes.form} onSubmit={submitHandler} noValidate>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label={t("SignUp.InputFields.EmailAddress")}
                name="email"
                onChange={inputChangedHandler}
                error={!email.valid && email.touched}
                helperText={!email.valid && email.touched ? email.validationMsg : null}
                required
                value={email.value}
                variant="outlined"
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
            {t("ForgotPassword.SendLink")}
          </Button>
        </form>
      </DirectionProvider>
    </Container>
  );
};

export default ForgotPassword;
