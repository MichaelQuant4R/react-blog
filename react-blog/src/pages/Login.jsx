import React from "react";
import {Route, Switch, Redirect, BrowserRouter as Router, useHistory} from "react-router-dom";
import Profile from "./Profile";
import {User} from "../auth/UserContext";
import Footer from "../components/Footer";

const Login = props => {
    
    
    const emailRef = React.useRef("");
    const passwordRef = React.useRef("");
    const urlPath = window.location.origin;
    const {user, setUser} = React.useContext(User);
    
    const history = useHistory();
    
    
    const handleSubmit = (e) => {
        
        e.preventDefault();
        console.log(e);
        
        console.log(emailRef.current.value, passwordRef.current.value);
        
        
                fetch(`${urlPath}/api/login`, {
            
            method:"POST",
            mode:"cors",
            headers: {
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Access-Allow-Control-Origin": "*"
            },
            
            body: JSON.stringify({
                "email":emailRef.current.value,
                "password":passwordRef.current.value
            })
            
        })
        .then(resp => {
            
            console.log(resp.ok);
            console.log(resp.status);
            console.log(resp);
            if(!resp.ok){
                
                throw new Error(resp.status);
            }
            else{
                return resp.json();
            }
        })
        .then(json => {
            
            console.log("JSON");
            console.log(json);
            
            var validLogin = json[0]["login"];
            
            if(validLogin){
                
                
                var list = [];
                
                const accessToken = json[1];
                
                const userJson = json[2];
                
                console.log("USER JSON LOGIN", userJson);
                
                list.push(userJson["username"]);
                list.push(userJson["image"]);
                list.push(userJson["id"]);
                list.push(userJson["email"]);
                
                console.log("LOGIN CACHING!");
                
                caches.open("currentUser").then(cache => {
                    cache.addAll(list).then(() => {
                        console.log("LIST DATA SAVED LOGIN!");
                    });
                });
                
            
                console.log("USER JSON", userJson);
                
                setUser(userJson);
                
                localStorage.setItem("accessToken", accessToken);
                
                console.log("LOGIN PROPS", props);
                history.push(`/profile/${userJson["username"]}/${userJson["id"]}`);
                
                emailRef.current = ""; passwordRef.current = "";
                
                console.log("LOGIN REFS", emailRef.current.value, passwordRef.current.value);
            }
            else{
                
                console.log("LOGIN ERROR!");
                
            }
            
        })
        .catch(error => {
            
            console.log(error);
            console.log("LOGIN ERROR");
            
            
        })
        

                
    };
    
    
    
    return (
    
    <div>
        <center>
            <h4>This is the Login page</h4>
            <hr/>
    
                <form  id="form-container" onSubmit={handleSubmit}>
                    
                    <label>Email</label>
                    <br/>
                    <input  type="email" name="email" ref={emailRef} 
                        placeholder="Enter email..."
                        required/>
                    <br/>
                    
                    <label>Password</label>
                    <br/>
                    <input type="password" name="password" ref={passwordRef} 
                        placeholder="Enter password..."
                        required/>
                    <br/>
                    
                    
                    <input type="submit" value="Login"/>
                    
                </form>
                
                
            </center>
            
            <Footer/>
    
    </div>
    );
};

export default Login;