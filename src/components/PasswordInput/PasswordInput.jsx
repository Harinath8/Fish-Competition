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
      <InputLabel htmlFor={props.id}>
        {props.translate}
      </InputLabel>
      <OutlinedInput
        name={props.name}
        id={props.id}
        value={props.passwordValue}
        type={props.showPassword ? "text" : "password"}
        onChange={(event) => props.setPassword(event)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={props.togglePassword}
              // onMouseDown={props.mouseDownPassword}
              edge="end"
            >
              {props.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={120}
      />
      {!props.valid && props.touched ? (
        <FormHelperText id={props.id}>
          {props.errorMsg}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default passwordInput;
