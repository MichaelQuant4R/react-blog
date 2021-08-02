import React from "react";
import {withRouter, Link} from "react-router-dom";
import Comment from "../components/Comment";
import "../css/blog.css";

class Blog extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            username: "",
            title: "",
            id: "",
            text: "",
            data: null,
            loading: true,
            exist: false,
            timestamp: null,
            image: "No image...",
            urlPath:`https://holistic-blogs.herokuapp.com`
        }
        
        this.fetchBlog = this.fetchBlog.bind(this);
    }
    
     fetchBlog = async (blogId) => {
        console.log("FETCH BLOG DATA!");
        
        fetch(`${this.state.urlPath}/api/blog/${blogId}`, {
            method:"GET",
            mode: "cors",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Access-Allow-Control-Origin":"*",
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
            console.log("ONE BLOG JSON!");
            console.log(json);
            console.log("EXISTS", json["exists"]);
            
//             console.log("BLOG DATA", json["blog"][0]);
            
            if(json["exists"]){
                
                let jsonUsername = json["blog"][0]["author"];
                let jsonText = json["blog"][0]["text"];
                let jsonId = json["blog"][0]["id"];
                let jsonTitle = json["blog"][0]["title"];
                let jsonTimestamp = json["blog"][0]["timestamp"];
                let jsonImage = json["blog"][0]["image"];
                
                this.setState({"username":jsonUsername});
                this.setState({"id":jsonId});
                this.setState({"text":jsonText});
                this.setState({"title":jsonTitle});
                this.setState({loading:false});
                this.setState({exist:false});
                this.setState({"timestamp": jsonTimestamp});
                this.setState({"image": jsonImage});
                
            }
            else{
                
                console.log("This blog does not exist!");
                this.setState({loading:false});
                this.setState({exist:true});
            }
        })
        .catch(error => {
            console.log(error);
        });
        }
    
    componentDidMount(){
        console.log("BLOG POST MOUNTED!");
        console.log("BLOG POST PARAMS", this.props.match.params.username, this.props.match.params.title, this.props.match.params.id);
        console.log("BLOG DATA!", this.props.blogData);
        console.log("PROPS", this.props);
        console.log("HISTORY", this.props.history);
        this.fetchBlog(this.props.match.params.id);
    }
    
    render(){
        
        return (
    
        <div>
                <>
                {this.state.loading?(
                    <h4>Loading...</h4>
                    
                    ):(
                   
                <>
                {this.state.exist?(
                            
                    <h4>This blog does not exist or has been deleted</h4>
                            
                    ):(
                 <>
                                    <center>
                    <h4>This is a Blog post page</h4>
                    <div id="blog-container">
                    <h2>{this.state.title}</h2>
                    <Link to={`/profile/${this.state.username}/${this.state.id}`}>
                    <img id="blog-author-image" src={this.state.image}/>
                    <h4>Author: {this.state.username}</h4>
                    </Link>
                    <h4>Posted: {this.state.timestamp}</h4>
                    <p>{this.state.text}</p>
                    </div>
                    <hr/>
                                    
                    <Comment/>

                    </center>
                </>
                            
                        )}
                    </>
                    )}
                </>
    </div>
    
        );
    };
    
};
    


export default withRouter(Blog);