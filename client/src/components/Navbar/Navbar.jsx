import React from 'react';
import { CloudTwoTone } from '@ant-design/icons';
import './navbar.scss'
import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
            <CloudTwoTone style={{fontSize: 38}}/>
            <div className="navbar__header">CLOUD STORAGE</div>
            <div className="navbar__login"><Link to="/login">Войти</Link></div>
            <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>
            </div>
        </div>
    );
};

export default Navbar;