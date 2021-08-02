import React, { useEffect, useState, useRef  } from 'react';
import {Link} from "react-router-dom";
import "../css/loading.css";
import "../css/blogs.css";

const authorImage = {
    
    borderRadius:"50%",
    height:"50px",
    width:"50px"
}




const Blogs = () => {
    
     const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(null);
    const [noMoreData, setNoMoreData] = React.useState(false);
    
    const urlPath = `https://holistic-blogs.herokuapp.com`;
    
    const maxRef = useRef(0);
    
    const [postList, setPostList] = useState({
        list: []
    }); 
    // tracking on which page we currently are
    const [page, setPage] = useState(0);
    // add loader refrence 
    const loader = useRef(null);

    useEffect(() => {
         var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
         };
        // initialize IntersectionObserver
        // and attaching to Load More div
         const observer = new IntersectionObserver(handleObserver, options);
        
        console.log("loader", loader.current);
         if (loader.current) {
            observer.observe(loader.current)
         }
    }, []);
    
    
    const fetchBlogs = async (page) => {
        console.log("FETCH!", page);
        // NOT TRUE = FALSE, NOT FALSE = TRUE
        if(!noMoreData){
        fetch(`${urlPath}/api/blog_page/${page}`,{
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
            
            console.log("JSON", json);
            
            let continueScrolling = json["scroll"];
            
            maxRef.current = json["max"]
            
        console.log("CHECK LENGTH!", maxRef.current, json["blogs"].length);
        if(maxRef.current !== json["blogs"].length ||maxRef.current === json["blogs"].length){
            
            if(continueScrolling){
                
                setData(json["blogs"]);
                
                console.log("BLOGS", json["blogs"]);
                setPostList({list: json["blogs"]});
                
                
                if(maxRef.current === json["blogs"].length){
                    setNoMoreData(true);
                    setLoading(false);
                    
                }
                console.log("MAX!", json["max"], maxRef.current);
            }
            else{
                console.log("STOP SCROLLING");
                setLoading(false);
            }
                
            }else{
                
                setNoMoreData(true);
                console.log("FINISHED LOADING!");
                setLoading(false);
            }
            
        })
        .catch(error => {
            console.log(error);
        })
            
        };
            
    };


    useEffect(() => {
        // here we simulate adding new posts to List
        
        fetchBlogs(page);

    }, [page])

    // here we handle what happens when user scrolls to Load More div
   // in this case we just update page variable
    const handleObserver = (entities) => {
        const target = entities[0];
        if(!noMoreData){
        if (target.isIntersecting) {   
            setPage((page) => page + 1)
        }
        }
    }


    return (
        <>
            
            <h4>Max: {maxRef.current}</h4>
        <div className="blog-container">
        <div className="post-list">
            {
                postList.list.map((post, index) => {
                    return (<div key={index} className="blog-post">
                        <div >
                        <h2> {post.title } </h2>
                            <img style={authorImage} src={post.image}/>
                            <Link to = {`/profile/${post.author}/${post.user_id}`}>
                            <h4>Author: {post.author}</h4>
                            </Link>
                            
                            <h5>Posted: {post.timestamp}</h5>
                            <Link to={`/blog/${post.author}/${post.title}/${post.id}`}>
                                <span>Read More</span>
                            </Link>
                            <p>
                                {post.text}
                                
                            </p>
                            
                            
                            
                        </div>
                    </div>)
                })
            }
            {loading?(
            <div className="loader" ref={loader}>
                    
           </div>):
            
            (
                <div>Finished</div>
                )}
            
        </div>
            
    </div>
               
    </>)
}

export default Blogs;