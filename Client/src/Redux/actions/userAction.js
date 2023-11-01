import axios from 'axios'
import { message } from 'antd';


export const signupUser = (values) => async dispatch => {

    try {
        await axios.post('/api/user/signup', values);
        message.success("User Registered Successfully ,Please Verify the Mail");
        setTimeout(() => {
            window.location.href = '/signin';
        }, 1000);
    } catch (error) {
        message.error('someting went wrong please Try later')
    }
}



export const loginUser = (values) => async dispatch => {

    try {
        const user = await axios.post('/api/user/signin', values);
        message.success('Login Successfully')
        localStorage.setItem('user', JSON.stringify(user.data))
        setTimeout(() => {
            window.location.href = '/home';
        }, 1000);
    } catch (error) {
        message.error('Invalid Credentials !');
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        const response = await axios.get('api/user/getallusers')
        dispatch({ type: 'GET_ALL_USERS', payload: response.data })
    } catch (error) {
        console.log(error);
    }
}

export const forgetPass = (values) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true })
    try {
        await axios.post('/api/user/forgetpassword', values)

        message.success('Password Update Successfull')
        setTimeout(() => {
            window.location.href = '/signin';
        }, 1000)
        dispatch({ type: 'LOADING', payload: false })

    } catch (error) {
        message.error("Please try again ");
        dispatch({ type: 'LOADING', payload: false })
    }
}