import React from 'react';
import { login } from '../../utils/FirebaseService';
import { Redirect, withRouter } from 'react-router-dom';



function Login({ authenticated }) {
    if(authenticated) return <Redirect to="/" />
    return(
        <div>
            <h2>You need to be logged in to access this page</h2>
            <button onClick={login}>Google Sign In</button>
        </div>
    )
}

export default withRouter(Login);