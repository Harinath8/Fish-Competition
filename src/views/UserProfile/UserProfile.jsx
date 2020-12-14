import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";

import Profile from "../../components/Profile/Profile";
import ProfileDetails from "../../components/Profile/ProfileDetails";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: 78,
  },
}));

const UserProfile = () => {
  const classes = useStyles();

  return (
    <Container className={classes.wrapper} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <Profile />
        </Grid>
        {/* <Grid item lg={8} md={6} xs={12}>
          <ProfileDetails />
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default UserProfile;
