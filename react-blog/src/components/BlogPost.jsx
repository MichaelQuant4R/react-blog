import React from "react";


const BlogPost = props => {
    
    const [text, setText] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [error, setError] = React.useState(false);
    const [posted, setPosted] = React.useState(false);
    const urlPath = window.location.origin;
    
    const textRef = React.useRef("");
    const titleRef = React.useRef("");
    
    
    
    React.useEffect(() => {
        
        console.log("BLOG EFFECT!");
        
        
        
        
        
        
    }, []);
   
    const handleTitle = (e) => {
        
        setTitle({[e.target.name]: e.target.value});
    };
    
    const handleText = (e) => {
        
        setText({[e.target.name]: e.target.value});
    };
  
    
    const handlePost = (e) => {
        
        e.preventDefault();
        console.log("POST BLOG!");
        
        console.log("DATA!", title, text);
        
        let token = localStorage.getItem("accessToken");
        
        
        let titleData = title["title"];
        let textData = text["text"];
        
        fetch(`${urlPath}/api/post_blog`, {
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Access-Allow-Control-Origin": "*",
                "Authorization": `Bearer ${token}`
            },
            
            body: JSON.stringify({
                
                titleData,
                textData
            })
            
        })
        .then(resp => {
            
            if(!resp.ok){
                
                throw new Error(resp.status);
                
            }else{
                
                
                return resp.json();
                
            }
            
        })
        .then(json => {
            
            
            console.log("JSON BLOG", json);
            
            
            var checkBlog = json["blog"];
            
            if(checkBlog){
                
                
                setPosted(true);
                setError(false);
                
                setTitle("");
                setText("");
                textRef.current.value = "";
                titleRef.current.value = "";
                
                
            }
            else{
                
                setPosted(false);
                setError(true);
                
                
            }
            
            
            
            
        })
        .catch(error => {
            
            console.log(error);
            
            
        });
       
        
        
        
        
    };
    
    
    
    
    
    return (
    
    <div>
    
            <center>
        <h4>Post a new Blog</h4>
            <hr/>
                
        {error?(
                    
          <h4>Error! Invalid inputs. Please try again</h4>  
                    
            ):(
                    
               null     
            )}
                
                
        {posted?(
                    
         <h4>Success! You've posted a new blog</h4>  
                    
                ):(
                   null 
                    
                )}
    
        <form id="blog-container" onSubmit = {handlePost}>
            
            <label>Title</label><br/>
            <input ref = {titleRef} type="text" name="title" placeholder="Add a title..." required
                onChange = {handleTitle}/>
            <br/>
            <br/>
            
            <textarea ref={textRef} placeholder="Say something cool!" name="text" required
                onChange = {handleText}></textarea>
            <br/>
            
            <input type="submit" value="Post"/>
        </form>
                
                
                
        </center>
    
    
    </div>
    );
};

export default BlogPost;