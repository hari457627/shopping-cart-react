import { Cookies } from "react-cookie";

const actions = {
    isAuthenticated : () => {
        const cookie = new Cookies();
        if (
            cookie.get("id") && cookie.get("email")
        ) {
            return true;
        }
        return false;
    },

    setUserCookies : async (cred) => {
        const cookie = new Cookies();
        cookie.set("id", cred.id);
        cookie.set("email", cred.email);
    },

    clearUserCookies : async () => {
        const cookie = new Cookies();
        cookie.remove("id");
        cookie.remove("email");
    },

    getUserCookies : async () => {
        const cookie = new Cookies();
        const id = cookie.get('id');
        const email = cookie.get("email");
        return {id, email};
    }
}

export default actions;