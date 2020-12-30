import { Route, Switch } from "react-router";
import Home from "../views/Home/Home";
import SignIn from "../views/SignIn/SignIn";
import Signup from "../views/Signup/Signup";
import ForgotPassword from "../views/user/ForgotPassword/ForgotPassword";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={SignIn} />
      <Route path="/forgotPassword" component={ForgotPassword} />
    </Switch>
  );
};

export default Routes;
