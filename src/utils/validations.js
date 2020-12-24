export const checkValidity = (value, rules, translate) => {
  let isValid = true;
  let errorMsg = null;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.isUserName) {
    if (value.length < rules.minLength) {
      return {
        valid: false,
        // validationMsg: `Name is too short (Minimum ${rules.minLength} characters needed.)`
        validationMsg: translate("SignUp.Validations.Name", { length: rules.minLength, }),
      };
    } else if (value.length > rules.maxLength) {
      return {
        valid: false,
        validationMsg: `Name is too long (Maximum ${rules.maxLength} characters allowed.)`,
      };
    } else {
      return {
        valid: true,
        validationMsg: null,
      };
    }
  }

  if (rules.isMobileNo) {
    if (!value) {
      return {
        valid: false,
        validationMsg: "Mobile Number Required!",
      };
    }

    if (value) {
      const pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(value)) {
        return {
          valid: false,
          validationMsg: "Please enter only number.",
        };
      } else if (value.length > 10) {
        return {
          valid: false,
          validationMsg: `Mobile Number is too long (Maximum 10 digits allowed)`,
        };
      } else if (value.length !== 10) {
        return {
          valid: false,
          validationMsg: `Mobile Number must (10 digits.)`,
        };
      }
    }

    return {
      valid: true,
      validationMsg: null,
    };
  }

  if (rules.isEmail) {
    if (!value) {
      return {
        valid: false,
        validationMsg: "Email Required!",
      };
    }

    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (!pattern.test(value)) {
      return {
        valid: false,
        validationMsg: "Not a valid Email",
      };
    }

    if (value.length > rules.maxLength) {
      return {
        valid: false,
        validationMsg: `Email is too long (Maximum ${rules.maxLength} characters allowed)`,
      };
    }

    return {
      valid: true,
      validationMsg: null,
    };
  }

  if (rules.isPassword) {
    if (!value) {
      console.log(rules.validationMsg)
      return {
        valid: false,
        validationMsg: rules.validationMsg,
      };
    }

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})");

    // var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if(value) {
      if (strongRegex.test(value)) {
        isValid= true;
        errorMsg= null
      } else {
        isValid= false;
        errorMsg= "Must contain one number, one uppercase and lowercase letter, one special character, and at least 8 characters"
      }

      if ((strongRegex.test(value) && value.length > rules.maxLength)) {
        return {
          valid: false,
          validationMsg: `Password is too long (Maximum ${rules.maxLength} characters allowed.)`,
        }
      }
    }

    // if (value.length < rules.minLength) {
    //   return {
    //     valid: false,
    //     validationMsg: `Password is too short (Minimum ${rules.minLength} characters needed.)`,
    //   };
    // } else if (value.length > rules.maxLength) {
    //   return {
    //     valid: false,
    //     validationMsg: `Password is too long (Maximum ${rules.maxLength} characters allowed.)`,
    //   };
    // } else {
    //   return {
    //     valid: true,
    //     validationMsg: null,
    //   };
    // }
  }

  if(rules.password) {
    if (!value) {
      return {
        valid: false,
        validationMsg: "Password Required!"
        // validationMsg: rules.validationMsg
      };
    }

    if (value.length < rules.minLength) {
      return {
        valid: false,
        validationMsg: `Password is too short (Minimum ${rules.minLength} characters needed.)`,
      };
    } else if (value.length > rules.maxLength) {
      return {
        valid: false,
        validationMsg: `Password is too long (Maximum ${rules.maxLength} characters allowed.)`,
      }
    }

  }

  return {
    valid: isValid,
    validationMsg: errorMsg,
  };
};
