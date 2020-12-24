export const signinFormInitialState = {
  username: {
    value: "",
    validation: {
      required: true,
      isUserName: true,
      minLength: 3,
      // maxLength: 15,
    },
    validationMsg: "Name or Email Required!",
    valid: false,
    touched: false,
  },
  password: {
    value: "",
    validation: {
      required: true,
      password: true,
      minLength: 8,
      maxLength: 16,
    },
    validationMsg: "Password Required!",
    valid: false,
    touched: false,
  },
};
