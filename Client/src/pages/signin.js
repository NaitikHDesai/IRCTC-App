import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/actions/userAction";
import forgetPassword from "./forgetPassword";

const Signin = () => {
  const { users } = useSelector((state) => state.usersReducers);
  const dispatch = useDispatch();

  const signin = (values) => {
    const existingUser = users.find(user => user.email === values.email);
    if (!existingUser) {
      message.error('User Does not Registered');
    } else if (existingUser && !existingUser.isVerified) {
      message.error('Please First Verify the Email');
    } else {
      dispatch(loginUser(values));
    }
  };

  return (
    <div className="osahan-signup">
      <div className="osahan-header-nav shadow-sm p-3 d-flex align-items-center bg-danger">
        <h5 className="font-weight-normal mb-0 text-white">
          <a className="text-danger mr-3" href="/getstart">
            <i className="icofont-rounded-left"></i>
          </a>
          Sign in to your account
        </h5>
      </div>
      <div className="px-3 pt-3 pb-5">
        <Form name="signinForm" onFinish={signin} layout="vertical" >
          <Form.Item name="email" label="Your Email" rules={[{ type: "email", message: "Please enter a valid email address", }, { required: true, message: "Email is required", },]}       >
            <Input placeholder="Enter Your Email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required", },]}          >
            <Input.Password placeholder="Enter Your Password" />
          </Form.Item>

          <Button htmlType="submit" className="btn btn-danger btn-block osahanbus-btn mb-4 rounded-1" style={{ marginTop: "20px" }}>
            SIGN IN
          </Button>
          <center>
            <div className="inline-elements">
              <p style={{ display: "inline" }}>or </p>
              <span className="">
                <a href="/forgetPassword">
                  Forgot your password?
                </a>
              </span>
            </div>

            <hr />
            <span>
              New User?
              <a href="/signup">
                Register here.
              </a>
            </span>
          </center>
        </Form>
      </div>
    </div >
  );
};

export default Signin;
