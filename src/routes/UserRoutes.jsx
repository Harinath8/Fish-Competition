import { Redirect, Route, Switch } from "react-router";
import Home from "../views/Home/Home";
import UserProfile from "../views/user/UserProfile/UserProfile";
import Competition from "../views/user/Competition/Competition";
import Ranks from "../views/user/Ranks/Ranks";
import Logout from "../views/Logout/Logout";

const UserRoutes = () => {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/competition" component={Competition} />
      <Route path="/ranks" component={Ranks} />
      <Route path="/logout" component={Logout} />
      <Redirect from="/" to="/home" />
      <Redirect to="/home" />
    </Switch>
  );
};

export default UserRoutes;
