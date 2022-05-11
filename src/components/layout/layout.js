import React, {useEffect, useState} from "react";
import Header from "../header";
import Footer from "../footer";
import Login from "../login";
import Signup from "../signup";
import Dashboard from "../dashboard";
import Snackbar from "../snackbar";

const Layout = (props) => {
    const [openSnackBar, setOpenSnackBar] = useState(false);

    useEffect(()=>{
        if(props.snackBar.open){
            setOpenSnackBar(() => false);
            setOpenSnackBar(() => true);
        }
    }, [props.snackBar])

    useEffect(()=>{
        if(openSnackBar){
            setTimeout(() => {
                setOpenSnackBar(false);
            }, 6000)
        }
    }, [openSnackBar])
    
    return (
        <>
            <Header />
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