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

    setUserCookies : async (cred, cartData = false) => {
        const cookie = new Cookies();
        if(cartData){
            cookie.set("cart_data", JSON.stringify(cred));
        }
        else{
            cookie.set("id", cred.id);
            cookie.set("email", cred.email);
        }
    },

    clearUserCookies : async () => {
        const cookie = new Cookies();
        cookie.remove("id");
        cookie.remove("email");
        cookie.remove("cart_data");
    },

    getUserCookies : async () => {
        const cookie = new Cookies();
        const id = cookie.get('id');
        const email = cookie.get("email");
        const cart_data = cookie.get("cart_data");
        return {id, email, cart_data};
    }
}

export default actions;