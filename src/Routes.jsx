import { Redirect, Route, Switch } from "react-router";
import { makeStyles } from "@material-ui/core";
import Home from "./views/Home/Home";
import SignIn from "./views/SignIn/SignIn";
import Signup from "./views/Signup/Signup";
import UserProfile from "./views/UserProfile/UserProfile";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";
import Logout from "./views/Logout/Logout";

const useStyles = makeStyles(() => ({
  wrapper: {
    paddingTop: 58,
  },
}));

// const routes = [
//   {
//     path: "/home",
//     component: Home,
//     needsAuth: false,
//   },
//   {
//     path: "/signup",
//     component: Signup,
//     needsAuth: false,
//   },
//   {
//     path: "/signin",
//     component: SignIn,
//     needsAuth: false,
//   },
//   {
//     path: "/logout",
//     component: Logout,
//     needsAuth: true,
//   },
//   {
//     path: "/profile",
//     component: UserProfile,
//     needsAuth: true,
//   },
//   {
//     path: "/forgotPassword",
//     component: ForgotPassword,
//     needsAuth: false,
//   },
// ];

// const RenderRoute = (route, isLogin= isLogin) => {
//   const history = useHistory();

//   console.log(route.needsAuth);
//   console.log(isLogin)
//   console.log(isAuthenticated())

  
//   document.title = route.title || "TrulyContacts";
//   if (route.needsAuth && !isAuthenticated()) {
//     <Redirect to="/home" />
//   }
//   return (
//     <Route
//       path={route.path}
//       exact
//       render={(props) => <route.component {...props} />}
//     >
//     </Route>
//   );
// };

// const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     component={(props) => props.isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
//     }
//   ></Route>
// );

const Routes = ({ isAuthenticated }) => {
  const classes = useStyles();

  let routes = (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={SignIn} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Redirect from="/" to="/home" />
      <Redirect to="/home" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/logout" component={Logout} />
        <Redirect from="/" to="/home" />
        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <div className={classes.wrapper}>
      {/* <Switch>
        {routes.map((route, index) => (
          // <PrivateRoute key={index} path={route.path} component={route.component} isAuthenticated={isAuthenticated} />
          <RenderRoute {...route} isLogin={isAuthenticated} key={index} />
        ))}
      </Switch> */}

      {routes}
    </div>
  );
};

export default Routes;
