import React, { useEffect } from "react";
import common_actions from "../../Common-Service";

const Dashboard = (props) => {

    const checkAuthUser = async (obj) => {
        const res = await props.checkUser(obj);
        if (!res.success) {
            await common_actions.clearUserCookies();
            props.history.push('/login');
        }
        else {
            props.history.push('/');
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
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard;