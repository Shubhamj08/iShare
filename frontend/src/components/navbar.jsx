import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">IShare</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav ml-auto">
                    <NavLink className="nav-item nav-link" to="/ideas">IDEAS</NavLink>
                    <NavLink className="nav-item nav-link" to="/post">POST</NavLink>
                    <NavLink className="nav-item nav-link" to="/auth">LOGIN/SIGNUP</NavLink>
                </div>
            </div>
        </nav>
     );
}

export default Navbar;