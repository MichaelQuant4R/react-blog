import Navbar from "./components/Navbar";
import NavbarAuth from "./components/NavbarAuth";
import {User} from "./auth/UserContext";
import React from "react";
import {useHistory, BrowserRouter as Router} from "react-router-dom";
import "./App.css";

const App = props =>  {
    
    const [user, setUser] = React.useState(null);
    const [isAuth, setIsAuth] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [id, setId] = React.useState("");
    const history = useHistory();
    const value = React.useMemo(() => ({user, setUser}), [user, setUser]);
    const urlPath = `https://holistic-blogs.herokuapp.com`;

    const HandleLogout = (e) => {
        console.log("LOGOUT USER FROM APP");
        setUser(null);
        console.log("APP USER", user);
        console.log("VALUE", value);
        
        setUsername("");
        setId("");
        value["user"] = null;
        console.log("AFTER VALUE", value);
        localStorage.removeItem("accessToken");
        caches.delete("currentUser").then(() => {
            console.log("CACHE CURRENT USER REMOVED!");
        });
        
    }
    
    
    
        
    React.useEffect(() => {
        
//         console.log("USE HISTORY", useHistory);
//         console.log("HISTORY", props.history);
        let token = localStorage.getItem("accessToken");
//         console.log("TOKEN NAVBAR", token);
        
        
        caches.open("currentUser").then((cache) => {
    
            cache.keys().then(( Array) => {

                console.log(Array);
//                 var cacheUsername = Array[1]["url"].split(window.location.origin);
//                 console.log(cacheUsername[1]);
                
            });
        });
        
        
        
        if(user === null && token !== null){
            
            let cacheList = [];
            
            fetch(`${urlPath}/api/auth`,{
                
                method:"GET",
                mode:"cors",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    "Access-Allow-Control-Origin":"*",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(resp => {
                
                if(!resp.ok){
                     throw new Error(resp.status);
                    
                }else{
                    return resp.json();
                }
            })
            .then(json => {
                
                console.log("JSON!");
                console.log(json);
                
                let checkAuth = json["auth"];
                
                if(checkAuth){
                    setUsername(json["username"]);
                    setId(json["id"]);
                    setUser(json);
                    
                    caches.has("currentUser").then(function(boolean){
                    if(!boolean){
                        cacheList.push(json["username"]);
                        cacheList.push(json["id"]);
                        cacheList.push(json["image"]);

                        console.log("ADDING NEW CACHES FOR NEW CURRENT USER!");

                        caches.open("currentUser").then((cache) => {

                        cache.addAll(cacheList).then(() => {
                            console.log("CACHE LIST", cacheList);

                                });
                            });
                        }
                        
                    });
                    
                }else{
                    console.log("NOT CHECK AUTH NAVBAR", checkAuth);
                }
            })
            .catch(error => {
                console.log("NAVBAR ERROR!");
                console.log(error);
                localStorage.removeItem("accessToken");
                console.log("PROPS!", props);
                console.log("HISTORY ERROR", history);
                   
            });
        }
        
    }, []);
    
    
  return (
    <>
         
          {user !== null || localStorage.getItem("accessToken") ? (
               <>
      <User.Provider value={value}>
          <Router>
         <NavbarAuth navbarAuth = {HandleLogout}  username={username} id={id} />
          </Router>
      </User.Provider>
              </>
              ):
          
          (
              <>
        <User.Provider value={value}>
            <Router>
        <Navbar />
            </Router>
        </User.Provider>
              </>
              
              )}
          
    </>
  );
}

export default App;
