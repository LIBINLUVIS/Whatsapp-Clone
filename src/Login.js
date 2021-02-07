import React from 'react'
import {Button} from "@material-ui/core";
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {auth,provider} from "./firebase";
import { actionTypes } from './reducer';
import {useStateValue} from './StateProvider';



function Login() {
    
    const [{},dispatch] = useStateValue();
    const signIn=()=>{
        auth.signInWithPopup(provider).then((result) => 
            {
                dispatch({
                    type:actionTypes.SET_USER,
                    user:result.user,
                });
            })
            .catch((error) => alert(error.message));
    };
    return (
    <div className="row">
         
        
        <div className="col-md-12 col-12">
        <div className="login">
        <img className="img" src="https://i.pinimg.com/originals/79/dc/31/79dc31280371b8ffbe56ec656418e122.png"/>
        <h1 className="login__text">Sign in to Whatsapp </h1>
        <Button   onClick={signIn}>
        Sign In with Google
        </Button>
        </div>
        </div>
    </div>
           
    )
}

export default Login
