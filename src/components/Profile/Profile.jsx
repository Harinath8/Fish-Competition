import React from "react";
import PropTypes from "prop-types";
// import clsx from "clsx";
// import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src="" />
          <Typography color="textPrimary" gutterBottom variant="h5">
            User Name
          </Typography>
          <Button variant="contained" color="secondary">
            Upload Picture
          </Button>
        </Box>
        <Divider />
        
        <Grid container spacing={2}>
          <Grid item lg={12} md={6} xs={12}>
            Email
          </Grid>
          <Grid item lg={12} md={6} xs={12}>
            Phone Number
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions></CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
