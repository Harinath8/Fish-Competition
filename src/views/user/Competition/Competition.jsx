import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
    Button,
  Container,
  FormControl,
  Grid,
  makeStyles,
  NativeSelect,
  TextField,
  Typography,
} from "@material-ui/core";
import DirectionProvider from "react-with-direction/dist/DirectionProvider";

import { GlobalContext } from "../../../context/Provider";
import { checkValidity } from "../../../utils/validations";
import { updateObject } from "../../../utils/updateObject";
import { competitionFormInitialState } from "../../../utils/initialStates/competitionForm";
import { getFishTypes, createCompetition } from "../../../api/competition";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: "none",
  },
  avatar: {
    height: 100,
    width: 100,
    marginTop: 18,
    marginBottom: 20,
  },
  uploadPicture: {
    margin: theme.spacing(1),
  },
  formControl: {
    width: "30%",
    marginBottom: "30px !important"
  }
}));

const Competition = () => {
  const classes = useStyles();
  const { direction, authState: { auth: { userId } } } = useContext(GlobalContext);

  const [competitionForm, setCompetitionForm] = useState(competitionFormInitialState.competitionForm);
  const [fishTypes, setFishTypes] = useState([]);
  const [fishPic, setFishPic] = useState();

  useEffect(() => {
    const fetchFishTypes = async () => {
      setFishTypes(await getFishTypes());
    };
    fetchFishTypes();
  }, []);

  const selectFishPicHandler = (event) => {
    const fishPic = event.target.files[0];
    if (fishPic) {
      setFishPic(URL.createObjectURL(event.target.files[0]));
      const updatedCompetitionForm = updateObject(competitionForm, {
        fishPicture: updateObject(competitionForm["fishPicture"], {
          value: fishPic,
          valid: true,
          // validationMsg: validation.validationMsg,
          touched: true,
        }),
      });

      let formIsValid = true;
      for (let inputIdentifier in updatedCompetitionForm) {
        if (updatedCompetitionForm[inputIdentifier].hasOwnProperty("valid")) {
          formIsValid = updatedCompetitionForm[inputIdentifier].valid && formIsValid;
        }
      }
      setCompetitionForm({ ...updatedCompetitionForm, formIsValid: formIsValid });
    }
  };

  const inputChangedHandler = (event) => {
    const validation = checkValidity(event.target.value, competitionForm[event.target.name].validation);
    const updatedCompetitionForm = updateObject(competitionForm, {
      [event.target.name]: updateObject(competitionForm[event.target.name], {
        value: event.target.value,
        valid: validation.valid,
        validationMsg: validation.validationMsg,
        touched: true,
      }),
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedCompetitionForm) {
      if (updatedCompetitionForm[inputIdentifier].hasOwnProperty("valid")) {
        formIsValid = updatedCompetitionForm[inputIdentifier].valid && formIsValid;
      }
    }
    setCompetitionForm({ ...updatedCompetitionForm, formIsValid: formIsValid });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!competitionForm.formIsValid) {
      const updatedForm = {
        ...competitionForm,
        fishType: { ...competitionForm.fishType, touched: true },
        length: { ...competitionForm.length, touched: true },
        fishPicture: { ...competitionForm.fishPicture, touched: true },
      };
      setCompetitionForm(updatedForm);
    }

    if (competitionForm.formIsValid) {
      console.log(competitionForm);
      createCompetition({
        userId,
        fishTypeId: competitionForm.fishType.value,
        fishLength: competitionForm.length.value,
        fishPicture: competitionForm.fishPicture.value,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.maindiv}>
      <Typography component="h1" variant="h5">
        Create Competition
      </Typography>

      <DirectionProvider direction={direction}>
        <form className={classes.form} onSubmit={submitHandler} noValidate>
          <Grid container spacing={2}>
            <FormControl className={classes.formControl}>
              <NativeSelect name="fishType" defaultValue="" onChange={inputChangedHandler} >
                <option value="">Select Fish Type</option>
                {fishTypes.map((fish) => (
                  <option key={fish.fishtype_id} value={fish.fishtype_id}>
                    {fish.fish_name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>

            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Length"
                // label={t("SignUp.InputFields.EmailAddress")}
                name="length"
                onChange={inputChangedHandler}
                error={
                  !competitionForm.length.valid &&
                  competitionForm.length.touched
                }
                helperText={
                  !competitionForm.length.valid &&
                  competitionForm.length.touched
                    ? competitionForm.length.validationMsg
                    : null
                }
                required
                value={competitionForm.length.value}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Avatar className={classes.avatar} src={fishPic} alt="fish Pic" />
          <input
            accept="image/*"
            className={classes.input}
            id="upload-fishPic"
            // multiple
            type="file"
            name="fishPicture"
            onChange={selectFishPicHandler}
          />
          <label htmlFor="upload-fishPic">
            <Button
              variant="contained"
              color="secondary"
              className={classes.uploadPicture}
              component="span"
            >
              Select Fish Picture
            </Button>
          </label>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Competition
          </Button>
        </form>
      </DirectionProvider>
    </Container>
  );
};

export default Competition;
