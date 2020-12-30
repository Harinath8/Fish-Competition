import React, { useEffect, useState } from "react";
import clsx from "clsx";
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
  Typography,
} from "@material-ui/core";
import DirectionProvider from "react-with-direction/dist/DirectionProvider";
import { getInitials } from '../../utils/getInitials';
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
    marginBottom: 22,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const Profile = ({ direction, editProfile, editPassword, profileDetails }) => {
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

  return (
    <DirectionProvider direction={direction}>
      <Card>
        <CardHeader title="Profile" />
        <Divider />

        <CardContent>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            {prifilePic ? (
              <Avatar className={classes.avatar} src={prifilePic} />
            ) : (
              <Avatar className={clsx(classes.orange, classes.avatar)}>
                <Typography component="h1" variant="h2">
                  {getInitials(profileDetails.userName)}
                </Typography>
              </Avatar>
            )}

            <Avatar
              className={classes.avatar}
              src={civilIdPic}
            />
          </Box>
          <Divider />

          <Grid container spacing={2}>
            <Grid item lg={12} md={6} xs={12}>
              {`Civil Id: ${profileDetails.civilId}`}
            </Grid>
            <Grid item lg={12} md={6} xs={12}>
              {`Name: ${profileDetails.userName}`}
            </Grid>
            <Grid item lg={12} md={6} xs={12}>
              {`Email Address: ${profileDetails.email}`}
            </Grid>
            <Grid item lg={12} md={6} xs={12}>
              {`Phone Number: ${profileDetails.telephone}`}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />

        <Box display="flex" justifyContent="flex-start" p={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => editPassword()}
          >
            Change Password
          </Button>
        </Box>

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
