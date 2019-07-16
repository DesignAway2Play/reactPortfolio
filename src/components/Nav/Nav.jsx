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
                <Link className="navLeft" to="/apod">APOD</Link>
            }
            <br />
                                    {
                <Link className="navLeft" to="/neo">NEO</Link>
            }
            <br />
            {
                authenticated ? 
                <button
                onClick={
                    () => (
                    logout()
                    .then(() => {
                        history.push("/");
                    })
                )}>Logout</button>
                :
                <Link to="/login">Login</Link>
            }
            <br />
            { isAdmin
                &&
                <Link to="/Admin">Admin</Link>
            }
    </nav>)
}


export default withRouter(Nav);