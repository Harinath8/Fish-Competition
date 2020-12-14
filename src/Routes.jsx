import { Redirect, Route, Switch } from "react-router";
import { makeStyles } from "@material-ui/core";
import Home from "./views/Home/Home";
import SignIn from "./views/SignIn/SignIn";
import Signup from "./views/Signup/Signup";
import UserProfile from "./views/UserProfile/UserProfile";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: 28,
  },
}));

const Routes = () => {
  const classes = useStyles();

  let routes = (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={SignIn} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Redirect from="/" to="/home" />
      <Redirect to="/home" />
    </Switch>
  );

  return (
    <div className={classes.wrapper}>
        {routes}
    </div>
  );
};

export default Routes;
