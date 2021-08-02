import React from "react";
import {User} from "../auth/UserContext";
import jwt_decode from "jwt-decode";
import BlogPost from "../components/BlogPost";
import "../css/profile.css";

class Profile extends React.Component{
    
    static contextType = User;

    constructor(props){
        super(props);
        
        this.state = {
            image: "No Image...",
            username: "",
            id: "",
            email: "",
            blog:false,
            loading:true,
            user:null,
            jwtId:null,
            user:"No data"
        }
        
        this.handleInfo = this.handleInfo.bind(this);
    }

    handleInfo = (username, id, sub) => {
        
        console.log("HANDLE INFO!");
        console.log(username, id, sub);
        
            fetch(`http://localhost:5000/api/view_profile/${username}/${id}`,{
                method:"GET",
                mode:"cors",
                headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Access-Allow-Control-Origin": "*"
            }
        })
        .then(resp => {

            if(!resp.ok){
                throw new Error(resp.status);
            }
            else{
                return resp.json();
            }

        })
        .then(json => {
            console.log("JSON!");
            console.log(json);

            var info = json[1];

            var checkID = parseInt(id);
            var checkUser = json[0]["view"];

            if(checkUser){

                if(sub !== null){

                    this.setState({loading: false});

                    if(username === info["username"] && checkID === info["id"] && checkID !== sub){

                        this.setState({image: info["image"]});
                        this.setState({id: info["id"]});
                        this.setState({username: info["username"]});
                        this.setState({email: info["email"]});
                        this.setState({blog:false});
                        // USER VIEWING ANOTHER USER

                    }else if(username === info["username"] && checkID === info["id"] && checkID === sub){


                        this.setState({image: info["image"]});
                        this.setState({id: info["id"]});
                        this.setState({username: info["username"]});
                        this.setState({email: info["email"]});

                        this.setState({blog:true});
                        // USER VIEWING OWN PROFILE

                    }else{

                        console.log("NOT THE SAME USER TEST!");
                        this.setState({id: info["id"]});
                        this.setState({username: info["username"]});
                        this.setState({image:info["image"]});
                        this.setState({blog:false});
                        // USER VIEWING ANOTHER USER
                    }

                }else{

                    this.setState({id: info["id"]});
                    this.setState({username: info["username"]});
                    this.setState({image:info["image"]});
                    this.setState({loading:false});
                    this.setState({exist:true});
                    this.setState({blog:false});
                    // USER EXISTS, VIEWED BY VISITOR

                }

            }
            else{
                this.setState({loading:false});
                this.setState({exist:true});
                this.setState({blog:false});
                // NO USER EXISTS
            }

        })
        .catch(error => {
            console.log(error);
            console.log("CATCH ERROR!");
        });
        
    };

    componentDidMount(){

            const user = this.context;
            let token = localStorage.getItem("accessToken");

            console.log("USER", user);
        
            if(user !== null){
            
                if(this.props.match.params !== {}){

                    this.setState({username: this.props.match.params.username});
                    this.setState({id: this.props.match.params.id});

                    if(token){

                        let decoded =  jwt_decode(token);

                        let sub = decoded["sub"];
                        const username = this.props.match.params.username;
                        const id = parseInt(this.props.match.params.id);

                        console.log(typeof(id), typeof(sub));

                        this.handleInfo(username,
                                            id,
                                              sub);
                        }
                
                }

                else{

                    this.setState({user: user["user"]});
                    this.setState({username: user["user"]["username"]});
                    this.setState({id: user["user"]["id"]});

                     this.setState({image: user["user"]["image"]});
                    this.setState({email: user["user"]["email"]});

                    this.setState({blog:true});
                    this.setState({loading: false});

                    console.log("EMAIL", user["user"]["email"], this.state.email);
                }
        }
        
        else{
            this.setState({username: this.props.match.params.username});
            this.setState({id: this.props.match.params.id});
            
            if(token){
            
                let decoded =  jwt_decode(token);
                
                let sub = decoded["sub"];
                const username = this.props.match.params.username;
                const id = parseInt(this.props.match.params.id);
                
                console.log(typeof(id), typeof(sub));
                
            this.handleInfo(username,
                                    id,
                                      sub);
            }
            else{
                
                console.log("ELSE", this.props.match.params);
                
                this.handleInfo(this.props.match.params.username,
                                    this.props.match.params.id,
                                      null);
            }
        }

        
    };

    render(){
        
      return (  
        
            <div>
    <center>
            <>
            {this.state.loading? (
                 <h4>Loading page....</h4>
               
                
                ):(
                
                <>
                    
                {this.state.exist? (
                        
                    <h4>This profile does not exist</h4>
                        
                        ):(
                        
                        <>
                        

                        <br/>
                        
                        <div id="profile-container">
                            <img id="profile-image" src={this.state.image} alt="MISSING>>>>"/>
                            <h4>My Email: {this.state.email}</h4>

                            <h4>Username: <span id="profile-username">{this.state.username}</span></h4>
                            
                             <>    
                        {this.state.blog? (
                             
                               <BlogPost/>
                                
                        ):(
                                null
                                    
                            )}
                        </>
                            
                            
                        </div>
                      
                                
                                
                        </>

                        
                        )}
                </>
                
                )}
           </>
            
            
    </center>
    
    </div>
    
        
        
        
        
        
        
        
        );
        
    };
    
};
export default Profile;