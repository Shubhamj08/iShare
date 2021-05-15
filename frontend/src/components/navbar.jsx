import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "../css/navbar.css";
import logo from '../assets/ishare-logo.png';

const Navbar = (props) => {

    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top mb-5"
        >
            <Link className="navbar-brand p-0" to="/"><img className='logo img-fluid' src={logo} alt={'IShare'}></img></Link>
            <button className="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed ? 'true' : 'false'} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div onClick={handleNavCollapse} className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                <div className="navbar-nav ml-auto">
                    <NavLink className="nav-item nav-link" to="/ideas">IDEAS</NavLink>
                    <NavLink  className="nav-item nav-link" to="/post">POST</NavLink>
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