import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/getstart" element={<GetStartPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/verify/:token" element={<Verification />} />

        <Route path="/forgetPassword" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
