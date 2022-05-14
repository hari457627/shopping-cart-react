import types from "./types";
import { combineReducers } from "redux";

const profileData = (state = null, action) => {
    switch (action.type) {
        case types.PROFILE_DATA:
            return action.payload;
        case types.LOGOUT:
            return null;
        default:
            return state;
    }
}

const cartData = (state = null, action) => {
    switch (action.type) {
        case types.CART_DATA:
            return action.payload;
        case types.LOGOUT:
            return null;
        default:
            return state;
    }
}

const categoriesData = (state = null, action) => {
    switch (action.type) {
        case types.CATEGORIES_DATA:
            return action.payload;
        case types.LOGOUT:
            return null;
        default:
            return state;
    }
}

const productsData = (state = null, action) => {
    switch (action.type) {
        case types.PRODUCTS_DATA:
            return action.payload;
        case types.LOGOUT:
            return null;
        default:
            return state;
    }
}

const isLoggedIn = (state = false, action) => {
    switch (action.type) {
        case types.LOGGED_IN:
            return action.payload;
        case types.LOGOUT:
            return false;
        default:
            return state;
    }
}

const snackBar = (state = { open: false, message: "" }, action) => {
    switch (action.type) {
        case types.OPEN_SNACKBAR:
            return action.payload;
        case types.LOGOUT:
            return { open: false, message: "" };
        default:
            return state;
    }
}

const currentTab = (state = 0, action) => {
    switch (action.type) {
        case types.TAB_CHANGE:
            return action.payload;
        default:
            return state;
    }
}

const bannerData = (state = null, action) => {
    switch (action.type) {
        case types.BANNER_DATA:
            return action.payload;
        case types.LOGOUT:
            return null;
        default:
            return state;
    }
}

const cartOpen = (state = false, action) => {
    switch (action.type) {
        case types.CART_OPEN:
            return action.payload;
        case types.LOGOUT:
            return false;
        default:
            return state;
    }
}

export default combineReducers({
    profileData,
    cartData,
    categoriesData,
    productsData,
    isLoggedIn,
    snackBar,
    currentTab,
    bannerData,
    cartOpen
});