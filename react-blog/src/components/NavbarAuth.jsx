import React from "react";
import {Switch, Link, Route, BrowserRouter as Router, withRouter, Redirect} from "react-router-dom";
import {createBrowserHistory} from "history";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Blog from "../pages/Blog";
import Bell from "./Bell";

const NavbarAuth = props => {
    
    const history = createBrowserHistory();
    const [redirect, setRedirect] = React.useState(false);
    
    const handleLogout = (e) => {
        console.log("LOGOUT!");
        props.navbarAuth();
        
    };
    
    
    if(redirect){
        
        <Router history = {history}>
        
            <Redirect to={`/profile/${props.username}/${props.id}`}/>
            <Switch>
            <Route exact path={`/profile/${props.username}/${props.id}`} component={Profile}/>
        
            </Switch>
        </Router>
    }
    
    
    return (
    
        <>
            <ul id="navbar">
                <li className="navbar-li">
                    <Link to="/">Home</Link>
                </li>
                
                <li className="navbar-li" id="navbar-profile">
                    <Link to={`/profile/${props.username}/${props.id}`}>{props.username}</Link>
                </li>
                
    
                 <li className="navbar-li">
                    <Link to="/blogs">Blogs</Link>
                </li>
                
                 <li className="navbar-li" onClick={handleLogout}>
                    <Link to="/login">Logout</Link>
                </li>
                
             <Bell/>
                
            </ul>
        <br/>
            
            
            <Switch>
            <Route exact path="/" component={Home}/>
                <Route exact path="/blogs" component={Blogs}/>
                <Route exact path="/login" component={Login}/>
                
                <Route exact path="/profile/:username/:id" component={Profile}/>
                 
                
                
                <Route exact path="/blog/:username/:title/:id" component={Blog}/>
                <Route component={NotFound} path="*"/>
            </Switch>
    </>
    
    );
    
};

export default withRouter(NavbarAuth);
