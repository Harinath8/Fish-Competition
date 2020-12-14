
export const signupFormInitialState = {
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
        minLength: 6,
        maxLength: 16,
      },
      validationMsg: "Password Required!",
      valid: false,
      touched: false,
    },
  };

  