import React from "react";
import {useParams, Link} from "react-router-dom";
import "../css/comment.css";


const Comment = props => {
    
    const textRef = React.useRef("");
    const blogIdRef = React.useRef(0);
    
    const {username, title, id} = useParams();
    
    const [comments, setComments] = React.useState([]);
    const urlPath = `https://holistic-blogs.herokuapp.com`;
    
    const fetchComments = async (blogID) => {
        
        console.log("BLOG ID FETCH COMMENTS!", blogID);
        fetch(`${urlPath}/api/get_comments/${blogID}`, {
            
            method: "GET",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Access-Allow-Control-Origin":"*",
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
            
            setComments(json["comments"]);
            
        })
        .catch(error => {
            
            console.log("GET COMMENTS ERROR!");
            console.log(error);
            
        })
        
    };
    
    
    const handleComment = (e) => {
        
        e.preventDefault();
        console.log("HANDLE COMMENT!");
        
        let text = textRef.current.value;
        var value = textRef;
        
        let blogID = blogIdRef.current
        
        console.log(textRef.current.value);
        
        
        
        let token = localStorage.getItem("accessToken");
        
        value.current.value = "";
        
        fetch(`${urlPath}/api/new_comment`,{
            
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Access-Allow-Control-Origin":"*",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                
                text,
                blogID
                
                
            })
            
        })
        .then(resp => {
            
            if(!resp.ok){
                
                throw  new Error(resp.status);
            }
            else{
                
                return resp.json();
                
            }
            
            
        })
        .then(json => {
            
            console.log("JSON", json);
            
            fetchComments(blogID);
            
            
        })
        .catch(error => {
            console.log(error);
            
            
        })
            
        
        
    };
    
    React.useEffect(() => {
    
        fetchComments(id);
        console.log("BLOG URL", username, title, id);
        
        console.log(typeof(id));
        
        blogIdRef.current = parseInt(id);
        console.log("comments!");
        console.log("BLOG REF ID", blogIdRef.current);
    
    
    }, [id, title, username]);
    
    
    
  return (  
    
    <div>
          <h4>Comments Page</h4>
          
          <form id="comment-container" onSubmit = {handleComment}>
              <textarea id="comment-textarea" ref = {textRef} placeholder="Add a comment.." required></textarea>
                  <br/>
                  <input type="submit" value="Comment"/>
          </form>
          <br/>
          <hr/>
          
          <div id="comment-div">
          {comments.map((comment, i) => (
          
              <div key={i} className="comment-container">
                      <div className="comment-user-info">
                          <Link to={`/profile/${comment.author}/${comment.user_id}`}>
                          <img className="comment-image" src={comment.image}/>
                          <h4 className="comment-author"> {comment.author}</h4>
                          </Link>
                          <span className="comment-timestamp">{comment.timestamp}</span>
                      </div>
                      
                      <div className="comment-text">
                          {comment.comment}
                      </div>
              </div>
          ))}
          
          <br/>
          </div>
 
    
    </div>
    
    );
};
export default Comment;











