import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({component: Component, ...rest}) => {
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={props => {
                return ( currentUser && currentUser.type === 'admin' ) ? <Component {...props} /> : <Redirect to={currentUser ? '/devices' : '/'} />
            }}
        />
    )
}

export default AdminRoute;