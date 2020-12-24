export const changePasswordInitialState = {
  oldPassword: {
    value: "",
    validation: {
      required: true,
      password: true,
      minLength: 8,
      maxLength: 16,
      validationMsg: "Old Password Required!",
    },
    valid: false,
    touched: false,
  },
  newPassword: {
    value: "",
    validation: {
      required: true,
      isPassword: true,
      minLength: 8,
      maxLength: 16,
      validationMsg: "New Password Required!",
    },
    valid: false,
    touched: false,
  },
  confirmPassword: {
    value: "",
    validation: {
      required: true,
      isPassword: true,
      minLength: 8,
      maxLength: 16,
      validationMsg: "Confirm Password Required!",
    },
    valid: false,
    touched: false,
  },
};
