import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Signup from "./pages/signup";
import Home from "./pages/home";
import FirstPage from "./pages/startpage";
import LandingPage from "./pages/landing";
import GetStartPage from "./pages/getstart";
import Signin from "./pages/signin";
import { getAllUsers } from './Redux/actions/userAction';
import { useDispatch } from "react-redux";
import Verification from "./pages/Verification";
import ForgetPassword from "./pages/forgetPassword";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={FirstPage} />
        <Route path="/landing" exact component={LandingPage} />
        <Route path="/getstart" exact component={GetStartPage} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/verify/:token" exact component={Verification} />
        <Route path="/forgetPassword" exact component={ForgetPassword} />
        <ProtectedRoute path="/home" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

export function ProtectedRoute(props) {
  const user = localStorage.getItem('user');
  const path = window.location.pathname;

  // List of paths where no authentication is required
  const noAuthPaths = [
    '/signin',
    '/signup',
    '/forgetpassword',
    '/verify/:token',
    '/getstart',
    '/landing',
    '/',
  ];

  if (!user && !noAuthPaths.includes(path)) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...props} />;
  }
}
