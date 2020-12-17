import React from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const passwordInput = (props) => {
  return (
    <FormControl
      variant="outlined"
      margin="none"
      fullWidth
      required
      error={!props.valid && props.touched}
    >
      <InputLabel htmlFor="outlined-adornment-password">
        {props.translate}
      </InputLabel>
      <OutlinedInput
        name="password"
        id="outlined-adornment-password"
        value={props.passwordValue}
        type={props.showPassword ? "text" : "password"}
        onChange={(event) => props.setPassword(event)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={props.togglePassword}
              onMouseDown={props.mouseDownPassword}
              edge="end"
            >
              {props.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={84}
      />
      {!props.valid && props.touched ? (
        <FormHelperText id="outlined-adornment-password">
          {props.errorMsg}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default passwordInput;
