import React from "react";
import HeaderLogo from "../../static/images/logo.png";
import { Link } from 'react-router-dom';
import "./header.css";
const Header = (props) => {
    return (
        <div className="header-container">
            <div>
                <img className="header-logo" src={HeaderLogo}/>
            </div>
            <div className="header-link-section">
                <Link to={`/login`} className="header-links">Signin</Link>
                <Link to={`/signup`} className="header-links">Register</Link>
            </div>
        </div>
    )
}

export default Header;