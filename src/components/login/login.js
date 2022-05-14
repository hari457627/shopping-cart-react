import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import common_actions from "../../Common-Service";
import { useDispatch } from 'react-redux';
import types from "../../reducers/types";
import "./login.css";

const Login = (props) => {
    
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await props.loginSubmit(credentials);
        if(res.success){
            props.history.push('/');
        }
        else{
            dispatch({type: types.OPEN_SNACKBAR, payload : {open: true, message : res.message}});
        }
    }

    const checkAuthUser = async (obj) => {
        const res = await props.checkUser(obj);
        if(!res.success){
            await common_actions.clearUserCookies();
            props.history.push('/login');
        }
        else{
            props.history.push('/');
        }
    }

    const getAuthUser = async () => {
        const userCookieObj = await common_actions.getUserCookies();
        checkAuthUser(userCookieObj);
    }

    useEffect(() => {
        const isLoggedIn = common_actions.isAuthenticated();
        if(isLoggedIn){
            getAuthUser(); 
        }
    },[])

    return (
        <main>
            <div className="login-block">
                <div className="login-left-section">
                    <div className="login-header-content">Login</div>
                    <p className="login-para-content">Get access to your orders, Wishlist and Recommendations</p>
                </div>
                <div className="login-right-section">
                    <form onSubmit={onSubmit}>
                        <TextField className="login-fields" required id="email" label="Email" variant="standard" type="email" value={credentials.email} onChange={onChange} 
                            // inputProps={{
                            //     autocomplete: 'new-password',
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
                        <Button className="login-button" type="submit" variant="outlined">Login</Button>
                    </form>
                </div>
            </div>
        </main>
    )
};

export default Login;