import React from 'react';
import {CloudTwoTone} from '@ant-design/icons';
import './navbar.scss'
import {useSelector, useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {logout} from "../../Redux/userReducer.js";


const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    const onLogout = () => {
        localStorage.removeItem('token')
        dispatch(logout())
    }

    return (
        <div className="navbar">
            <div className="container">
                <CloudTwoTone style={{fontSize: 38}}/>
                <div className="navbar__header">CLOUD STORAGE</div>
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth &&
                <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <div className="navbar__login" onClick={onLogout}><a>Выход</a></div>}
            </div>
        </div>
    );
};

export default Navbar;