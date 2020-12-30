import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import DirectionProvider from "react-with-direction/dist/DirectionProvider";

const useStyles = makeStyles((theme) => ({
  root: {},
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
    // marginBottom: 20,
    margin: theme.spacing(1),
  },
}));

const ProfileDetails = ({ direction, saveDetails, profileDetails, setProfileDetails }) => {
  const classes = useStyles();

  const [prifilePic, setPrifilePic] = useState();
  const [civilIdPic, setCivilIdPic] = useState();
  
  useEffect(() => {
    let blob = new Blob([profileDetails.userPicturePath], {
      type: "image/jpeg",
    });
    let reader = new FileReader();
    reader.addEventListener("loadend", () => {
      const contents = reader.result;
      setPrifilePic(contents);
    });
    reader.readAsDataURL(blob);
  }, [profileDetails.userPicturePath]);

  useEffect(() => {
    let blob = new Blob([profileDetails.civilIdPicturePath], {
      type: "image/jpeg",
    });
    let reader = new FileReader();
    reader.addEventListener("loadend", () => {
      const contents = reader.result;
      setCivilIdPic(contents);
    });
    reader.readAsDataURL(blob);
  }, [profileDetails.civilIdPicturePath]);


  const handleChange = (event) => {
    let value = event.target.value;
    if (event.target.name === "userPicturePath") {
      // value = event.target.files[0];
      value = event.target.files[0];

      setPrifilePic(URL.createObjectURL(event.target.files[0]));
      console.log(event.target.files[0])

    } else if (event.target.name === "civilIdPicturePath") {
      // value = event.target.files[0];
      value = event.target.files[0];

      setCivilIdPic(URL.createObjectURL(event.target.files[0]));
      console.log(event.target.files[0].name)
    }

    setProfileDetails({
      ...profileDetails,
      [event.target.name]: value,
    });
  };

  return (
    <DirectionProvider direction={direction}>
      <form autoComplete="off" noValidate>
        <Card>
          <CardHeader title="Edit Profile" />
          <Divider />

          <Box alignItems="center" display="flex" flexDirection="row" justifyContent="space-between">
            <Avatar className={classes.avatar} src={prifilePic} alt="profile Pic" />

            <input
              // accept="image/*"
              // accept="image/x-png,image/gif,image/jpeg"
              // accept=".png, .jpg, .jpeg"
              
              accept="image/x-png,image/jpeg"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              name="userPicturePath"
              onChange={handleChange}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="secondary"
                className={classes.uploadPicture}
                component="span"
              >
                Upload Picture
              </Button>
            </label>

            <Button
              variant="contained"
              color="primary"
              className={classes.uploadPicture}
              disabled={!profileDetails.userPicturePath}
              startIcon={<DeleteIcon />}
            >
              Delete Picture
            </Button>


            <Avatar className={classes.avatar} src={civilIdPic} alt="CivilId Pic" />

            <input
              accept="image/*"
              className={classes.input}
              id="civilId-file"
              multiple
              type="file"
              name="civilIdPicturePath"
              onChange={handleChange}
            />
            <label htmlFor="civilId-file">
              <Button
                variant="contained"
                color="secondary"
                className={classes.uploadPicture}
                component="span"
              >
                Civil ID Picture
              </Button>
            </label>

            <Button
              variant="contained"
              color="primary"
              className={classes.uploadPicture}
              disabled={!profileDetails.civilIdPicturePath}
              startIcon={<DeleteIcon />}
            >
              Delete Picture
            </Button>
          </Box>

          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  // helperText="Please specify the first name"
                  label="Name"
                  name="userName"
                  onChange={handleChange}
                  required
                  value={profileDetails.userName}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={profileDetails.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="telephone"
                  onChange={handleChange}
                  type="number"
                  value={profileDetails.telephone}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Civil Id"
                  name="civilId"
                  onChange={handleChange}
                  type="number"
                  value={profileDetails.civilId}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => saveDetails()}
            >
              Save details
            </Button>
          </Box>
        </Card>
      </form>
    </DirectionProvider>
  );
};

export default ProfileDetails;
