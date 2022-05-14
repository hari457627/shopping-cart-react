import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import common_actions from "../../Common-Service";
import { useDispatch } from 'react-redux';
import types from "../../reducers/types";
import "./signup.css";

const Signup = (props) => {

    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ fname: '', lname: '', email: '', password: '', cnfpassword: '' });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if(!credentials.fname || !credentials.fname.trim().length || !credentials.lname || !credentials.lname.trim().length || !credentials.email || !credentials.email.trim().length || !credentials.password || !credentials.password.trim().length || !credentials.cnfpassword || !credentials.cnfpassword.trim().length || (credentials.password !== credentials.cnfpassword)){
            dispatch({type: types.OPEN_SNACKBAR, payload : {open: true, message : 'Fill all the fields, pwd and confirm pwd s/b same'}});
        }
        else{
            const res = await checkAuthUser({email : credentials.email, password : credentials.password}, true);
            if(res.success && res.data){
                dispatch({type: types.OPEN_SNACKBAR, payload : {open: true, message : 'Email already exists, please login with email and password'}});
            }
            else{
                dispatch({type: types.OPEN_SNACKBAR, payload : {open: true, message : 'User registered successfully'}});
                props.history.push('/login');
            }
        }
    }

    const checkAuthUser = async (obj, fromCurrent = false) => {
        const res = await props.checkUser(obj, fromCurrent);
        if(fromCurrent){
            return res;
        }
        else{
            if (!res.success) {
                await common_actions.clearUserCookies();
                props.history.push('/login');
            }
            else {
                props.history.push('/');
            }
        }
    }

    const getAuthUser = async () => {
        const userCookieObj = await common_actions.getUserCookies();
        checkAuthUser(userCookieObj);
    }

    useEffect(() => {
        const isLoggedIn = common_actions.isAuthenticated();
        if (isLoggedIn) {
            getAuthUser();
        }
    }, [])

    return (
        <main>
            <div className="login-block">
                <div className="login-left-section">
                    <div className="login-header-content">Signup</div>
                    <p className="login-para-content">We do not share your personal details with anyopne</p>
                </div>
                <div className="login-right-section">
                    <form onSubmit={onSubmit}>
                        <TextField className="login-fields" required id="fname" label="First Name" variant="standard" type="text" value={credentials.fname} onChange={onChange}
                        // inputProps={{
                        //     autocomplete: 'new-password',
                        //     form: {
                        //         autocomplete: 'off'
                        //     },
                        // }} 
                        /><br />
                        <TextField className="login-fields" required id="lname" label="Last Name" variant="standard" type="text" value={credentials.lname} onChange={onChange}
                        // inputProps={{
                        //     autocomplete: 'new-password',
                        //     form: {
                        //         autocomplete: 'off'
                        //     },
                        // }} 
                        /><br />
                        <TextField className="login-fields" required id="email" label="Email" variant="standard" type="email" value={credentials.email} onChange={onChange}
                        //  inputProps={{
                        //     form: {
                        //         autocomplete: 'off'
                        //     },
                        // }} 
                        /><br />
                        <TextField className="login-fields" required id="password" label="Password" variant="standard" type="password" value={credentials.password} onChange={onChange}
                        // inputProps={{
                        //     autocomplete: 'new-password',
                        //     form: {
                        //         autocomplete: 'off'
                        //     },
                        // }} 
                        /><br />
                        <TextField className="login-fields" required id="cnfpassword" label="Confirm Password" variant="standard" type="password" value={credentials.cnfpassword} onChange={onChange}
                        // inputProps={{
                        //     autocomplete: 'new-password',
                        //     form: {
                        //         autocomplete: 'off'
                        //     },
                        // }} 
                        /><br />
                        <Button className="login-button" type="submit" variant="outlined">Signup</Button>
                    </form>
                </div>
            </div>
        </main>
    )
};

export default Signup;