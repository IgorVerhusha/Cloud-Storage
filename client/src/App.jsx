import React from 'react';
import "./App.scss"
import Navbar from "./components/Navbar/Navbar.jsx";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Registration from "./components/Registration/Registration.jsx";



const App = () => {
    return (
        <BrowserRouter>
        <div className="app">
            <Navbar/>
            <div className="wrapper">
                <Switch>
                    <Route path="/registration" component={Registration}/>
                </Switch>
            </div>
        </div>
        </BrowserRouter>
    );
};

export default App;