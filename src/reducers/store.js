import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import reducers from "./root-reducer";
import thunk from "redux-thunk";

// Support Redux dev tools Chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers({ ...reducers });
const rootReducer = (state, action) => {
    if (action.type === "LOGOUT") {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};
export default initialState =>
    createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );