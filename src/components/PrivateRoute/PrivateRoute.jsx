import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ authenticated, component: Component, ...rest }) {
    return (
        <Route render={props => (
            authenticated
            ? <Component {...rest} {...props} />
            : <Redirect to={{
                pathname: "/login",
                state: { from: props.location }
            }} />
        )}/>
    )
}

export default PrivateRoute;