import React from 'react';
import { NavLink } from 'react-router-dom';

const AuthSidebar = (props) => {
    return (
        <ol className="breadcrumb w-50 mx-auto bg-white justify-content-end">
            <NavLink className="breadcrumb-item" to="/auth/login">Login</NavLink>
            <NavLink className="breadcrumb-item" to="/auth/signup">Signup</NavLink>
        </ol>
     );
}

export default AuthSidebar;