import types from "../reducers/types";
import axios from "axios";
import common_service from "../Common-Service";

const actions = {
    loginSubmit: (cred) => async dispatch => {
        try {
            const { status, data } = await axios.get("./server/profiles/index.json");
            if (status === 200) {
                if (data && data.length) {
                    const profileObj = data.find(item => (((item.email).toLowerCase() === (cred.email).toLowerCase()) && ((item.password).toLowerCase() === (cred.password).toLowerCase())));
                    if (profileObj) {
                        dispatch({ type: types.PROFILE_DATA, payload: profileObj });
                        dispatch({ type: types.LOGGED_IN, payload: true });
                        await common_service.setUserCookies({ id: profileObj.id, email: profileObj.email })
                        return { success: true, data: profileObj };
                    }
                    return { success: false, message: 'No user found, please register yourself...' };
                }
                return { success: false, message: 'No user found, please register yourself...' };
            }
            return { success: false, message: 'No user found, please register yourself...' };
        }
        catch (err) {
            return { success: false, message: err.message };
        }
    },

    checkUser: (cred, fromCurrent = false) => async dispatch => {
        try {
            const { status, data } = await axios.get("./server/profiles/index.json");
            if (status === 200) {
                if (data && data.length) {
                    let profileObj;
                    if (fromCurrent) {
                        profileObj = data.find(item => (item.email).toLowerCase() === (cred.email).toLowerCase());
                    }
                    else {
                        profileObj = data.find(item => (((item.email).toLowerCase() === (cred.email).toLowerCase()) && ((item['id']).toLowerCase() === (cred['id']).toLowerCase())));
                    }
                    if (profileObj) {
                        if (!fromCurrent) {
                            dispatch({ type: types.PROFILE_DATA, payload: profileObj });
                            dispatch({ type: types.LOGGED_IN, payload: true });
                        }
                        return { success: true, data: profileObj };
                    }
                    return { success: false, message: !fromCurrent ? 'No user found, please register yourself...' : '' };
                }
                return { success: false, message: !fromCurrent ? 'No user found, please register yourself...' : '' };
            }
            return { success: false, message: !fromCurrent ? 'No user found, please register yourself...' : '' };
        }
        catch (err) {
            return { success: false, message: err.message };
        }
    },

    getCategories: () => async dispatch => {
        try {
            const { status, data } = await axios.get("./server/categories/index.get.json");
            if (status === 200 && data) {
                dispatch({ type: types.CATEGORIES_DATA, payload: data });
                return { success: true, data };
            }
            return { success: false, data: null, message: 'No categories to display' };
        }
        catch (err) {
            return { success: false, message: err.message };
        }
    },

    getCategoryProducts: () => async dispatch => {
        try {
            const { status, data } = await axios.get("./server/products/index.get.json");
            if (status === 200 && data) {
                dispatch({ type: types.PRODUCTS_DATA, payload: data });
                return { success: true, data };
            }
            return { success: false, data: null, message: 'No products to display' };
        }
        catch (err) {
            return { success: false, message: err.message };
        }
    },

    getBannerDeals: () => async dispatch => {
        try {
            const { status, data } = await axios.get("./server/banners/index.get.json");
            if (status === 200 && data) {
                dispatch({ type: types.BANNER_DATA, payload: data });
                return { success: true, data };
            }
            return { success: false, data: null, message: 'No banners to display' };
        }
        catch (err) {
            return { success: false, message: err.message };
        }
    },

    editCart: (catid, prodid, productDetails, cartData, fromCartPage = false, add = false) => async dispatch => {
        try {
            const { status, data } = await axios.get("./server/addToCart/index.post.json");
            if (status === 200 && data) {
                let prevCartData = JSON.parse(JSON.stringify(cartData ? cartData : {}));
                if (!fromCartPage) {
                    if (prevCartData && prevCartData[catid]) {
                        if (prevCartData[catid][prodid]) {
                            prevCartData[catid][prodid] = { ...productDetails, quantity: prevCartData[catid][prodid].quantity + 1 };
                        }
                        else {
                            prevCartData[catid][prodid] = { ...productDetails, quantity: 1 };
                        }
                    }
                    else if (prevCartData && !prevCartData[catid]) {
                        prevCartData[catid] = { [prodid]: { ...productDetails, quantity: 1 } }
                    }
                    else {
                        prevCartData[catid] = {};
                        prevCartData[catid][prodid] = { ...productDetails, quantity: 1 };
                    }
                    dispatch({ type: types.OPEN_SNACKBAR, payload: { open: true, message: data.responseMessage } });
                }
                else {
                    if (prevCartData && Object.keys(prevCartData).length) {
                        if (prevCartData && prevCartData[catid] && prevCartData[catid][prodid] && prevCartData[catid][prodid].quantity === 1 && !add) {
                            delete prevCartData[catid][prodid];
                            if (!Object.keys(prevCartData[catid]).length) {
                                delete prevCartData[catid]
                            }
                        }
                        else {
                            prevCartData[catid][prodid] = { ...prevCartData[catid][prodid], quantity: add ? prevCartData[catid][prodid].quantity + 1 : prevCartData[catid][prodid].quantity - 1 };
                        }
                        if (prevCartData && !Object.keys(prevCartData).length) {
                            prevCartData = null;
                        }
                        dispatch({ type: types.OPEN_SNACKBAR, payload: { open: true, message: `Product ${add ? 'added to' : 'removed from'} cart successfully` } });
                    }
                }
                await common_service.setUserCookies(prevCartData, true);
                dispatch({ type: types.CART_DATA, payload: prevCartData });
                return { success: true, data };
            }
            return { success: false, data: null, message: 'Failed to edit cart' };
        }
        catch (err) {
            dispatch({ type: types.OPEN_SNACKBAR, payload: { open: true, message: err.message } });
            return { success: false, message: err.message };
        }
    }
}

export default actions;