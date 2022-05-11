import types from "../reducers/types";
import axios from "axios";
import common_actions  from "../Common-Service";

const actions = {
    loginSubmit: (cred) => async dispatch => {
        try {
            const {status, data} = await axios.get("./server/profiles/index.json");
            if(status === 200){
                if(data && data.length){
                    const profileObj = data.find(item => (((item.email).toLowerCase() === (cred.email).toLowerCase()) && ((item.password).toLowerCase() === (cred.password).toLowerCase())));
                    if(profileObj){
                        dispatch({ type: types.PROFILE_DATA, payload: profileObj });
                        dispatch({ type: types.LOGGED_IN, payload: true });
                        await common_actions.setUserCookies({id: profileObj.id, email: profileObj.email})
                        return { success : true, data: profileObj };
                    }
                    return { success : false, message: 'No user found, please register yourself...' };
                }
                return { success : false, message: 'No user found, please register yourself...' };
            }
            return { success : false, message: 'No user found, please register yourself...' };
        }
        catch (err) {
            return { success : false, message: err.message };
        }
    },

    checkUser: (cred, fromCurrent = false) => async dispatch => {
        try {
            const {status, data} = await axios.get("./server/profiles/index.json");
            if(status === 200){
                if(data && data.length){
                    let profileObj;
                    if(fromCurrent){
                        profileObj = data.find(item => (item.email).toLowerCase() === (cred.email).toLowerCase()); 
                    }
                    else{
                        profileObj = data.find(item => (((item.email).toLowerCase() === (cred.email).toLowerCase()) && ((item['id']).toLowerCase() === (cred['id']).toLowerCase()))); 
                    }
                    if(profileObj){
                        if(!fromCurrent){
                            dispatch({ type: types.PROFILE_DATA, payload: profileObj });
                            dispatch({ type: types.LOGGED_IN, payload: true });
                        }
                        return { success : true, data: profileObj };
                    }
                    return { success : false, message: !fromCurrent ? 'No user found, please register yourself...' : '' };
                }
                return { success : false, message: !fromCurrent ? 'No user found, please register yourself...' : '' };
            }
            return { success : false, message: !fromCurrent ? 'No user found, please register yourself...' : '' };
        }
        catch (err) {
            return { success : false, message: err.message };
        }
    }
}

export default actions;