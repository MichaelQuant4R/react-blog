import React from "react";
import {User} from "../auth/UserContext";

const About = props => {
    
    const {user} = React.useContext(User);
    
    
    return (
    
    <div>
    
            <h4>About page</h4>
            <div>{JSON.stringify({user})}</div>
    
    </div>
    );
};

export default About;