import React from "react";
import {User} from "../auth/UserContext";
import Footer from "../components/Footer";
import Blogs from "./Blogs";

const Home = props => {
    
    const {user} = React.useContext(User);
    
    React.useEffect(() => {
        
        console.log("USER", user);
        
        
        
    }, [user]);
    
    return (
    
    <div>
    
            <h4>Home page</h4>
            <div>{JSON.stringify({user})}</div>
    
            <Blogs/>
            
            <Footer/>
    </div>
    );
};

export default Home;