import React from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  makeStyles,
  Grid,
  CardHeader,
} from "@material-ui/core";
import DirectionProvider from "react-with-direction/dist/DirectionProvider";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
    marginBottom: 22,
  },
}));

const Profile = ({ direction, editProfile, profileDetails }) => {
  const classes = useStyles();

  return (
    <DirectionProvider direction={direction}>
      <Card>
        <CardHeader title="Profile" />
        <Divider />

        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Avatar className={classes.avatar} src={profileDetails.profilePicture} />
          </Box>
          <Divider />

          <Grid container spacing={2}>
            <Grid item lg={12} md={6} xs={12}>
              {`Name: ${profileDetails.name}`}
            </Grid>
            <Grid item lg={12} md={6} xs={12}>
              {`Email Address: ${profileDetails.email}`}
            </Grid>
            <Grid item lg={12} md={6} xs={12}>
              {`Phone Number: ${profileDetails.phoneNumber}`}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />

        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => editProfile()}
          >
            Edit details
          </Button>
        </Box>
      </Card>
    </DirectionProvider>
  );
};

// Profile.propTypes = {
//   className: PropTypes.string,
// };

export default Profile;
