import React from "react";
import {Switch, Link, Route, withRouter} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Blogs from "../pages/Blogs";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Blog from "../pages/Blog";

function Navbar(props){
    
    
        const navbarHandleLogin = (username, id) => {
        
        
        console.log("USERNAME ID", username, id);
        
        props.navbarLogin(username, id)
        
    };
    
    
    
    
    return (
    
        <>
            <ul id="navbar">
                <li className="navbar-li">
                    <Link to="/">Home</Link>
                </li>
                
                 <li className="navbar-li">
                    <Link to="/about">About</Link>
                </li>
                
                 <li className="navbar-li">
                    <Link to="/blogs">Blogs</Link>
                </li>
                
                 <li className="navbar-li">
                    <Link to="/login">Login</Link>
                </li>
                
                 <li className="navbar-li">
                    <Link to="/signup">Sign up</Link>
                </li>
            </ul>
            <br/>
        
            <Switch>
            <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/blogs" component={Blogs}/>
                <Route exact path="/login">
                    <Login setLoginProfile = {navbarHandleLogin} />
                </Route>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/profile/:username/:id" component={Profile} />
                <Route exact path="/blog/:username/:title/:id" component={Blog}/>
                <Route component={NotFound} path="*"/>
    
            </Switch>
    </>
    
    );
    
};

export default withRouter(Navbar);
