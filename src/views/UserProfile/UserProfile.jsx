import React, { useContext, useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";

import ProfileDetails from "../../components/Profile/Profile";
import EditProfileDetails from "../../components/Profile/ProfileDetails";
import { GlobalContext } from "../../context/Provider";
import ChangePassword from "../../components/Profile/ChangePassword";

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
    phoneNumber: "1234567892",
  });
  const [changePassword, setChangePassword] = useState(false);
  

  const editProfileHandler = () => {
    setEditProfile(!editProfile);
  };

  const editPasswordHandler = () => {
    setChangePassword(!changePassword);
  };

  const saveDetailsHandler = () => {
    setEditProfile(!editProfile);
    console.log(profileData);
  };

  const savePasswordHandler = (passwordDetails) => {
    setChangePassword(!changePassword);
    console.log(passwordDetails);
  };

  let profile = (
    <ProfileDetails
      direction={direction}
      profileDetails={profileData}
      editProfile={editProfileHandler}
      editPassword={editPasswordHandler}
    />
  );

  const editProfileDetails = (
    <EditProfileDetails
      direction={direction}
      saveDetails={saveDetailsHandler}
      profileDetails={profileData}
      setProfileDetails={setProfileData}
    />
  );

  const updatePassword = (
    <ChangePassword 
    direction={direction}
    savePassword={savePasswordHandler} />
  );

  if(editProfile) profile = editProfileDetails;
  if(changePassword) profile = updatePassword;

  return (
    <Container className={classes.wrapper} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          {profile}
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
