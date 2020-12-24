import React, { useState } from "react";
import { Box, Button, Divider, Grid, Container } from "@material-ui/core";
import DirectionProvider from "react-with-direction/dist/DirectionProvider";
import PasswordInput from "../PasswordInput/PasswordInput";
import { useTranslation } from "react-i18next";
import { changePasswordInitialState } from "../../utils/initialStates/changePassword";
import { updateObject } from "../../utils/updateObject";
import { checkValidity } from "../../utils/validations";

const ChangePassword = ({ direction, savePassword }) => {
  const { t } = useTranslation();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordDetails, setPasswordDetails] = useState(changePasswordInitialState);

  const handleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const inputChangedHandler = (event) => {
    const validation = checkValidity(event.target.value, passwordDetails[event.target.name].validation, t);
    
    const updatedPasswordDetails = updateObject(passwordDetails, {
        [event.target.name]: updateObject(passwordDetails[event.target.name], {
          value: event.target.value,
          valid: validation.valid,
          validation: updateObject(passwordDetails[event.target.name].validation, {
            validationMsg: validation.validationMsg,
          }),
          // validationMsg: validation.validationMsg,
          touched: true,
        }),
      });
      
      setPasswordDetails({ ...updatedPasswordDetails });
  };

  const confirmPasswordHandler = (event) => {
    let valid;
    let validationMsg;
    if (passwordDetails.newPassword.value !== event.target.value) {
      valid = false;
      validationMsg = "Password not matched!";
    } else {
      valid = true;
      validationMsg = "";
    }

    const updatedPasswordDetails = updateObject(passwordDetails, {
      [event.target.name]: updateObject(passwordDetails[event.target.name], {
        value: event.target.value,
        valid: valid,
        validation: updateObject(passwordDetails[event.target.name].validation, {
            validationMsg: validationMsg,
        }),
        touched: true,
      }),
    });

    setPasswordDetails({ ...updatedPasswordDetails });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!passwordDetails.oldPassword.valid || !passwordDetails.newPassword.valid || !passwordDetails.confirmPassword.valid) {
        const updatedForm = {
            ...passwordDetails,
            oldPassword: { ...passwordDetails.oldPassword, touched: true },
            newPassword: { ...passwordDetails.newPassword, touched: true },
            confirmPassword: { ...passwordDetails.confirmPassword, touched: true },
        }
        setPasswordDetails(updatedForm);
    }

    if (passwordDetails.oldPassword.valid && passwordDetails.newPassword.valid && passwordDetails.confirmPassword.valid) {
        savePassword({ oldPassword: passwordDetails.oldPassword.value, newPassword: passwordDetails.newPassword.value, confirmPassword: passwordDetails.confirmPassword.value })
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <DirectionProvider direction={direction}>
        <form autoComplete="off" noValidate>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <PasswordInput
                name="oldPassword"
                id="outlined-adornment-oldPassword"
                passwordValue={passwordDetails.oldPassword.value}
                valid={passwordDetails.oldPassword.valid}
                touched={passwordDetails.oldPassword.touched}
                showPassword={showOldPassword}
                errorMsg={passwordDetails.oldPassword.validation.validationMsg}
                setPassword={inputChangedHandler}
                togglePassword={handleShowOldPassword}
                translate={t("ChangePassword.OldPassword")}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <PasswordInput
                name="newPassword"
                id="outlined-adornment-newPassword"
                passwordValue={passwordDetails.newPassword.value}
                valid={passwordDetails.newPassword.valid}
                touched={passwordDetails.newPassword.touched}
                showPassword={showNewPassword}
                errorMsg={passwordDetails.newPassword.validation.validationMsg}
                setPassword={inputChangedHandler}
                togglePassword={handleShowNewPassword}
                translate={t("ChangePassword.NewPassword")}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <PasswordInput
                name="confirmPassword"
                id="outlined-adornment-confirmPassword"
                passwordValue={passwordDetails.confirmPassword.value}
                valid={passwordDetails.confirmPassword.valid}
                touched={passwordDetails.confirmPassword.touched}
                showPassword={showConfirmPassword}
                errorMsg={passwordDetails.confirmPassword.validation.validationMsg}
                setPassword={confirmPasswordHandler}
                togglePassword={handleShowConfirmPassword}
                translate={t("ChangePassword.ConfirmPassword")}
              />
            </Grid>
          </Grid>

          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={(event) => submitHandler(event)}
            >
              Submit
            </Button>
          </Box>
        </form>
      </DirectionProvider>
    </Container>
  );
};

export default ChangePassword;
