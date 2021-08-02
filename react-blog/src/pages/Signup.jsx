import React from "react";
import {Route, Switch, Redirect, BrowserRouter as Router} from "react-router-dom";
import Login from "./Login";
import {User} from "../auth/UserContext";
import withAuth from "../components/withAuth";
import Footer from "../components/Footer";


const Signup = props => {
    
    const {user} = React.useContext(User);
    
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isSignedUp, setIsSignedUp] = React.useState(false);
    const urlPath = window.location.origin;
    
    const handleSubmit = (e) => {
        
        e.preventDefault();
        console.log(e);
        
        console.log("SIGNED UP!", username, email, password, confirmPassword);
        
        
        var usernameData = username["username"];
        var emailData = email["email"];
        var passwordData = password["password"];
        var confirmPasswordData = confirmPassword["confirmPassword"];

        fetch(`${urlPath}/api/signup`, {
            
            method:"POST",
            mode:"cors",
            headers: {
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Access-Allow-Control-Origin": "*"
            },
            
            body: JSON.stringify({
                usernameData,
                emailData, 
                passwordData,
                confirmPasswordData
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
            
            var validSignup = json[0]["signup"];
            
            if(validSignup){
                
                setIsSignedUp(true);
                
            }
            else{
                
                console.log("SIGN UP ERROR!");
                setIsSignedUp(false);
                
            }
            
        })
        .catch(error => {
            
            console.log(error);
            console.log("ERROR");
        });
        
    };
    
    
    const handleUsername = (e) => {
        
        setUsername({[e.target.name]: e.target.value})
    };
    
    
    const handleEmail = (e) => {
        
        setEmail({[e.target.name]: e.target.value})
    };
    
    
    const handlePassword = (e) => {
        
        setPassword({[e.target.name]: e.target.value})
    };
    
    
    const handleConfirmPassword = (e) => {
        
        setConfirmPassword({[e.target.name]: e.target.value})
    };
    
    
    React.useEffect(() => {
        
        console.log("SIGN UP EFFECT!");
        console.log("USER", user);
        
//         if(user !== null){
            
//             history.push("/");
            
            
//         }
        
        
        
    }, [user]);
    

    
    
    if(isSignedUp){
        
        return (
        
            <Router>
                <Redirect to="/login"/>
                <Switch>
                    <Route exact path ="/login" component={Login}/>
                </Switch>
        </Router>
            
            )
    }
    
    
    
    return (
    
    <div>
    
            <center>
            <h4>This is the Signup page</h4>
            <hr/>
    
                <form id="form-container"  onSubmit={handleSubmit}>
                    
                    <label>Username</label>
                    <br/>
                    <input type="text" name="username" onChange={handleUsername}
                        placeholder="Enter username..."
                        required/>
                    <br/>
                    
                    
                    <label>Email</label>
                    <br/>
                    <input type="email" name="email" onChange={handleEmail}
                        placeholder="Enter email..."
                        required/>
                    <br/>
                    
                    <label>Password</label>
                    <br/>
                    <input type="password" name="password" onChange={handlePassword}
                        placeholder="Enter password..."
                        required/>
                    <br/>
                    
                    
                    
                    <label>Confirm Password</label>
                    <br/>
                    <input type="password" name="confirmPassword" onChange={handleConfirmPassword}
                        placeholder="Confirm password..."
                        required/>
                    <br/>
                    
                    <input type="submit" value="Sign up"/>
                    
                    
                    
                </form>
                
                
            </center>
  
            <Footer/>
    </div>
    );
};

export default withAuth(Signup);




