import React from 'react';
import { logout } from '../../utils/FirebaseService';
import { Link, withRouter } from 'react-router-dom';
import '../Nav/Nav.module.css';


function Nav({ history, location, authenticated, isAdmin }) {
    return (<nav className="navLeft">
            {
                <Link className="navLeft" to="/">Home</Link>
            }
            <br />
            {
                authenticated ? 
                <span
                onClick={
                    () => (
                    logout()
                    .then(() => {
                        history.push("/");
                    })
                )}>Logout</span>
                :
                <Link to="/login">Login</Link>
            }
            <br />
            { authenticated
                &&
                <span onClick={logout}>Log</span>
            }
            { isAdmin
                &&
                <Link to="/Admin">Admin</Link>
            }
    </nav>)
}


export default withRouter(Nav);