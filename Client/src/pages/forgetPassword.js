import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { Form, Input, Button } from 'antd';
import { forgetPass } from '../Redux/actions/userAction';

function ForgetPassword() {
    const { users } = useSelector((state) => state.usersReducers);
    const dispatch = useDispatch();
    function Forget(values) {
        const existingUser = users.find((user) => user.email === values.email);
        const existingPassword = users.find((user) => user.password === values.password);
        if (!existingUser) {
            message.error('Invalid Email');
        } else if (!existingUser.isVerified) {
            message.error('Your Account is not Verified. Please Verify Account First');
        } else {
            if (existingPassword) {
                message.error('Password Cannot be same as Previous One');
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
                message.error('Password Should be Strong');
            } else if (values.password !== values.cnfpassword) {
                message.error('Password does not match');
            } else {
                dispatch(forgetPass(values));
            }
        }
    }
    return (
        <div className="osahan-signup">
            <div className="osahan-header-nav shadow-sm p-3 d-flex align-items-center bg-danger">
                <h5 className="font-weight-normal mb-0 text-white">
                    <a className="text-danger mr-3" href="/getstart">
                        <i className="icofont-rounded-left"></i>
                    </a>
                    Forget Password
                </h5>
            </div>
            <div className="p-3">
                <Form onFinish={Forget} layout="vertical">
                    <Form.Item name="email" label="Your Email" rules={[{ required: true, message: 'Email is required' }]}>
                        <Input type="email" placeholder="Enter Your Email" />
                    </Form.Item>


                    <Form.Item name="password" label="New Password" rules={[{ required: true, message: 'Password is required' }]}>
                        <Input.Password placeholder="Enter Your Password" />
                    </Form.Item>
                    <p className="text-muted text-bold text-left small">
                        Password must be a minimum of 8 characters and must contain lowercase, uppercase, a special character, and a numeric digit.
                    </p>

                    <Form.Item name="cnfpassword" label="Confirm Password" rules={[{ required: true, message: 'Password is required' }]}>
                        <Input.Password placeholder="Enter Your Password" />
                    </Form.Item>


                    <Button htmlType="submit" className="btn btn-danger btn-block osahanbus-btn mb-3 rounded-1 mt-4"         >
                        Change Password
                    </Button>

                </Form>
            </div>
        </div>
    );
}

export default ForgetPassword


