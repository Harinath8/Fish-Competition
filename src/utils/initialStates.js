export const signupFormInitialState = {
  signupForm: {
    name: {
      value: "",
      validation: {
        required: true,
        isUserName: true,
        minLength: 3,
        maxLength: 15,
      },
      validationMsg: "Name Required!",
      valid: false,
      touched: false,
    },
    phoneNo: {
      value: "",
      validation: {
        required: true,
        isMobileNo: true,
      },
      validationMsg: "Mobile Number Required!",
      valid: false,
      touched: false,
    },
    email: {
      value: "",
      validation: {
        required: true,
        isEmail: true,
        maxLength: 32,
      },
      validationMsg: "Email Required!",
      valid: false,
      touched: false,
    },
    civilId: {
      value: "",
      validation: {
        required: true,
        isCivilId: true,
      },
      validationMsg: "Civil Id Required!",
      valid: false,
      touched: false,
    },
    password: {
      value: "",
      validation: {
        required: true,
        isPassword: true,
        minLength: 8,
        maxLength: 16,
      },
      validationMsg: "Password Required!",
      valid: false,
      touched: false,
    },
    roles: ["USER"],
  },
  formIsValid: false,
  // roles: ["USER"],
};


export const changePasswordInitialState = {
  oldPassword: {
    value: "",
    validation: {
      required: true,
      isPassword: true,
      minLength: 8,
      maxLength: 16,
    },
    validationMsg: "Old Password Required!",
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
    },
    validationMsg: "New Password Required!",
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
    },
    validationMsg: "Confirm Password Required!",
    valid: false,
    touched: false,
  },
}