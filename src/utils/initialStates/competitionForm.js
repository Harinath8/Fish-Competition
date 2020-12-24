export const competitionFormInitialState = {
  competitionForm: {
    fishType: {
      value: "",
      validation: {
        required: true,
      },
      validationMsg: "Fish Type Required!",
      valid: false,
      touched: false,
    },
    length: {
      value: "",
      validation: {
        required: true,
      },
      validationMsg: "Length Required!",
      valid: false,
      touched: false,
    },
    fishPicture: {
        value: "",
        validation: {
          required: true,
        },
        validationMsg: "Fish Picture Required!",
        valid: false,
        touched: false,
      },
  },
  formIsValid: false,
};
