import './styles.css';
import { useState } from 'react';
import { Button } from '@material-ui/core';

const NavbarV2 = ({loggedIn}) => {
    const [toggle, setToggle] = useState(false);
    const toggle_menu = () => {
        if(toggle) { setToggle(false); } else { setToggle(true); }
    }
    return (
        <div>
            <nav class="navbar">
                <div class="navbar__container">
                    <a href="/" id="navbar__logo">TASKIT</a>
                    <div class={toggle ? "navbar__toggle is-active" : "navbar__toggle"} id="mobile-menu" onClick={toggle_menu}>
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                    <ul class={toggle ? "navbar__menu active" : "navbar__menu"}>
                        <li class="navbar__item">
                            <a href="/dashboard" class="navbar__links">
                            Dashboard
                            </a>
                        </li>
                        <li class="navbar__item">
                            <a href="/workspace" class="navbar__links">
                            Workspace
                            </a>
                        </li>
                        <li class="navbar__btn">
                            <a href="/login" class="button">
                            Login
                            </a>
                        </li>
                        <li class="navbar__btn">
                            <a href="/registeration" class="button">
                            Sign_Up
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavbarV2
