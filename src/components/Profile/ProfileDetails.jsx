import React from "react";
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

  const handleChange = (event) => {
    // event.target.files[0]

    let value = event.target.value;
    if (event.target.name === "profilePicture")
      value = URL.createObjectURL(event.target.files[0]);

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

          <Box alignItems="center" display="flex" flexDirection="column">
            <Avatar className={classes.avatar} src={profileDetails.profilePicture} alt="profile Pic" />

            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              name="profilePicture"
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
              disabled={!profileDetails.profilePicture}
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
                  name="name"
                  onChange={handleChange}
                  required
                  value={profileDetails.name}
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
                  name="phoneNumber"
                  onChange={handleChange}
                  type="number"
                  value={profileDetails.phoneNumber}
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
