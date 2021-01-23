import React, {useState} from 'react';
import {CloudTwoTone} from '@ant-design/icons';
import './navbar.scss'
import {useSelector, useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {logout} from "../../Redux/userReducer.js";
import {Input} from "antd";
import {searchFile, getFiles} from "../../Redux/actions/file.js";

const {Search} = Input;

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)

    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)

    const onLogout = () => {
        localStorage.removeItem('tokenCloud')
        dispatch(logout())
    }
    const searchNameHandler = (e) => {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        if (e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFile(value))
            }, 500, e.target.value))
        }else{
            dispatch(getFiles(currentDir))
        }

    }

    return (
        <div className="navbar">
            <div className="container">
                <CloudTwoTone style={{fontSize: 38}}/>
                <div className="navbar__header">CLOUD STORAGE</div>
                {isAuth && <Search placeholder="input search text" allowClear value={searchName}
                                   onChange={e => searchNameHandler(e)} enterButton
                                   style={{width: 220, marginLeft: 40}}/>}
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth &&
                <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <div className="navbar__login" onClick={onLogout}><a>Выход</a></div>}
            </div>
        </div>
    );
};

export default Navbar;