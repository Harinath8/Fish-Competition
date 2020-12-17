import React, { useContext, useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";

import Profile from "../../components/Profile/Profile";
import ProfileDetails from "../../components/Profile/ProfileDetails";
import { GlobalContext } from "../../context/Provider";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: 78,
  },
}));

const UserProfile = () => {
  const classes = useStyles();

  const { direction } = useContext(GlobalContext);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePicture: "",
    name: "Harinath",
    email: "harinath@nafaes.com",
    phoneNumber: "1234567892"
  })

  const editProfileHandler = () => {
    setEditProfile(!editProfile);
  }

  const saveDetailsHandler = () => {
    setEditProfile(!editProfile);
    console.log(profileData);
  }

  const profile = (
    <ProfileDetails 
     direction={direction}
     saveDetails={saveDetailsHandler}
     profileDetails={profileData}
     setProfileDetails={setProfileData} />
  );

  return (
    <Container className={classes.wrapper} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          {editProfile ? profile : <Profile direction={direction} editProfile={editProfileHandler} profileDetails={profileData} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
