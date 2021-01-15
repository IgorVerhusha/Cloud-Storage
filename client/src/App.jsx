import React, {useEffect} from 'react';
import "./App.scss"
import Navbar from "./components/Navbar/Navbar.jsx";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Registration from "./components/Auth/Registration.jsx";
import Login from "./components/Auth/Login.jsx";
import {useSelector, useDispatch} from "react-redux";
import {auth} from "./Redux/actions/user.js";
import Spinner from "./components/Spinner/Spinner.jsx";
import Disk from "./components/Disk/Disk.jsx";


const App = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const isFetching = useSelector(state => state.user.isFetching)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])
    return (
    <BrowserRouter>
        { isFetching ? <Spinner/> :
        <div className="app">
            <Navbar/>
            <div className="wrapper">
                {!isAuth ?
                    <Switch>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/login" component={Login}/>
                    <Redirect to="/" />
                </Switch> :
                    <Switch>
                        <Route exact path="/" component={Disk}/>
                        <Redirect to="/" />
                    </Switch>
                }
            </div>
        </div>}
    </BrowserRouter>
    );
};

export default App;