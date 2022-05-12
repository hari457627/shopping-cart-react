import React from "react";
import { Link } from 'react-router-dom';
import common_actions from "../../Common-Service";
import { useDispatch } from 'react-redux';
import types from "../../reducers/types";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import "./header.css";

const Header = (props) => {

    const dispatch = useDispatch();
    const handleLogout = async () => {
        await common_actions.clearUserCookies();
        dispatch({type: types.LOGOUT});
        props.history.push('/login');
    }
    const handleChange = (e,val) => {
        dispatch({type: types.TAB_CHANGE, payload: val});
    }

    return (
        <div className="header-container">
            <div className="header-container-left-section">
                <img className="header-logo" src={'./static/images/logo.png'}/>
                <div className="header-container-tabs">
                {
                    props.isLoggedIn ?
                    <Tabs value={props.currentTab} onChange={handleChange} aria-label="Shopping cart tabs">
                        <Tab label="Home" className={`${props.currentTab === 0 ? 'header-nav-active-tab' : ''} header-nav`}/>
                        <Tab label="Products" className={`${props.currentTab === 1 ? 'header-nav-active-tab' : ''} header-nav`}/>
                    </Tabs>
                    : null
                }
                </div>
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