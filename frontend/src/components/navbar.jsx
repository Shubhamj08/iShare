import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "../css/navbar.css";
import logo from '../assets/ishare-logo.png';
import profileImage from '../assets/Profile.webp';

const Navbar = (props) => {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-light bg-light sticky-top mb-5"
        >
            <Link className="navbar-brand p-0" to="/"><img className='logo' src={logo} alt={'IShare'}></img></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav ml-auto">
                    <NavLink className="nav-item nav-link" to="/ideas">IDEAS</NavLink>
                    <NavLink className="nav-item nav-link" to="/post">POST</NavLink>
                    {!props.user && <NavLink className="nav-item nav-link" to="/auth">LOGIN/SIGNUP</NavLink>}
                    {props.user &&
                        <React.Fragment>
                        <NavLink className="nav-item nav-link" to="/profile">{ props.user.username }</NavLink>
                            <NavLink className="nav-item nav-link" to="/logout"><small>LOGOUT</small></NavLink>
                        </React.Fragment>}
                </div>
            </div>
        </nav>
     );
}

export default Navbar;