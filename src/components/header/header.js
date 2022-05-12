import React from "react";
import HeaderLogo from "../../static/images/logo.png";
import { Link } from 'react-router-dom';
import common_actions from "../../Common-Service";
import { useDispatch } from 'react-redux';
import types from "../../reducers/types";
import "./header.css";

const Header = (props) => {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        console.log('sess logout');
        await common_actions.clearUserCookies();
        dispatch({type: types.LOGOUT});
        props.history.push('/login');
    }

    return (
        <div className="header-container">
            <div>
                <img className="header-logo" src={HeaderLogo}/>
            </div>
            <div className="header-link-section">
                {
                    !props.isLoggedIn
                    ?
                    <>
                        <Link to={`/login`} className="header-links">Signin</Link>
                        <Link to={`/signup`} className="header-links">Register</Link>
                    </>
                    :
                    <>
                        <Link to={`/login`} onClick={()=>handleLogout()} className="header-links">Logout</Link>
                    </>
                }
            </div>
        </div>
    )
}

export default Header;