import React from 'react';
import './styles.css';
import { useState } from 'react';

import { Button } from '@material-ui/core';

const NavbarV2 = () => {
    const [toggle, setToggle] = useState(false);
    const toggle_menu = () => {
        if(toggle) { setToggle(false); } else { setToggle(true); }
    }

    const userData = JSON.parse(localStorage.getItem('user'));
    const [loggedIn, setLoggedIn] = useState(!!userData);
    let log = "Login";
    let action = "/login";
    let b1 = "SignUp";
    let b1Act = "/registeration";
    if (loggedIn) {
      b1 = "Profile";
      b1Act = "/viewprofile";
      log = "Logout";
      action = "/logout";
    }

    const logo = `${process.env.REACT_APP_DATA_API}/img/static/Taskit.png`;

    return (
        <div>
            <nav className="navbar">
                <div className="navbar__container">
                    <a href="/" id="navbar__logo">
                      <img src={logo} className="taskitLogoSmall" alt="Taskit"></img>
                    </a>
                    <div className={toggle ? "navbar__toggle is-active" : "navbar__toggle"} id="mobile-menu" onClick={toggle_menu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                    <ul className={toggle ? "navbar__menu active" : "navbar__menu"}>
                        <li className="navbar__item">
                            <a href="/feed" className="navbar__links">
                            Explore
                            </a>
                        </li>
                        <li className="navbar__item">
                            <a href="/workspace" className="navbar__links">
                            Workspace
                            </a>
                        </li>
                        <li className="navbar__btn">
                            <a href={b1Act} className="button">
                                {b1}
                            </a>
                        </li>
                        <li className="navbar__btn">
                            <a href={action} className="button">
                                {log}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavbarV2
