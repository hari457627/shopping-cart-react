import React, {useEffect, useState} from "react";
import Header from "../header";
import Footer from "../footer";
import Login from "../login";
import Signup from "../signup";
import Dashboard from "../dashboard";
import Snackbar from "../snackbar";
import { useDispatch } from 'react-redux';
import types from "../../reducers/types";

const Layout = (props) => {
    
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(props.snackBar.open){
            setOpenSnackBar(() => false);
            setOpenSnackBar(() => true);
        }
    }, [props.snackBar])

    useEffect(()=>{
        if(openSnackBar){
            setTimeout(() => {
                dispatch({type: types.OPEN_SNACKBAR, payload : {open: false, message : ''}});
                setOpenSnackBar(false);
            }, 2000)
        }
    }, [openSnackBar])
    
    return (
        <>
            <Header {...props}/>
            {
                props.path === 'login'
                    ?
                    <Login {...props}/>
                    :
                    props.path === 'signup'
                        ?
                        <Signup {...props}/>
                        :
                        <Dashboard {...props}/>
            }
            <Footer />
            <Snackbar message={props.snackBar.message} openSnackbar={openSnackBar} setOpenSnackBar={setOpenSnackBar}/>
        </>
    );
} 

export default Layout;