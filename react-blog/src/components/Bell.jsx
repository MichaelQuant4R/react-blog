import React from "react";
import "../css/bell.css";
import jwt_decode from "jwt-decode";
import {Link, withRouter, Redirect, Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Profile from "../pages/Profile";

const notifyHidden = {
  
    marginRight:"-320px",
    transition: "0.2s ease-out"
}

const notifyShow = {
   
    marginRight:"0px",
    transition: "0.2s ease-in"
}


const bellShow = {
    
    backgroundColor:"rgba(220, 50, 50, 0.9)"
}

const bellHide= {
    backgroundColor:"Transparent"
}





const Bell = props => {
    
    const [currentNotifyStyle, setCurrentNotifyStyle] = React.useState(notifyHidden);
    const [notifyList, setNotifyList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [clickedBell, setClickedBell] = React.useState(false);
    
    const urlPath = window.location.origin;
    
    const [toggleBell, setToggleBell] = React.useState(bellHide);
    
    const [authorName, setAuthorName] = React.useState(false);
    const [authorId, setAuthorId] = React.useState(false);
    const [counting, setCounting] = React.useState(0);
    
    const fetchBell = async (id, token) => {
        
        if(!clickedBell){
        
        fetch(`${urlPath}/api/notify/${id}`,{
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
            }
            else{
                return resp.json();
            }
        })
        .then(json => {
        
            console.log("BELL JSON!", json);
            
            setClickedBell(true);
            
            let check = json["check"];
            
            if(check){
                console.log(json["new"]);
                let bellCountJson = 0;
                
                for(var i = 0; i < json["new"].length; i++){
                    
                    console.log(i);
                    if(json["new"][i].bell === true){
                        
                        console.log(i, json["new"][i].bell);
                        bellCountJson += 1;
                        
                    }
                }
                
                
                if(bellCountJson > 0){
                    
                    setToggleBell(bellShow);
                    
                    setCounting(bellCountJson);
                    
                    
                }
                setNotifyList(json["new"]);
                
                
                setLoading(false);
                
                
                
            }
            else{
                setLoading(false);
            }
            
        })
        .catch(error => {
            console.log("ERROR BELL!", error);
            setLoading(false);
        });
      
        }else{
            setToggleBell(bellShow);
        }
    };
    
    
    const handleRedirectAuthor = (getAuthorName, getAuthorId) => {
        
        
//         history.push(`/profile/${getAuthorName}/${getAuthorId}`);
        setAuthorName(getAuthorName);
        setAuthorId(getAuthorId);
        
    };

    const handleToken = async () => {
        
        let token = await localStorage.getItem("accessToken");
        
        console.log("BELL TOKEN", token);
        
        let decoded = await jwt_decode(token);
        
        console.log("BELL DECODED!", decoded);
        
        
        console.log(decoded);
        
         let sub = decoded["sub"];
        
        console.log("BELL SUB", sub);
        
        let id = parseInt(sub);
        
        fetchBell(id, token);
        
        
    };
    
    
    React.useEffect(() => {
        
        
        handleToken();
        

        
    }, []);
    
    const handleNotify = async (e) => {
        
        if(currentNotifyStyle["marginRight"] !== "0px"){
            setCurrentNotifyStyle(notifyShow);
            
            setToggleBell(bellHide);
            setCounting(0);
            let token = await localStorage.getItem("accessToken");
            let decoded = await jwt_decode(token);
            
            console.log("HANDLE NOTIFY", decoded);
            let sub = decoded["sub"];
            console.log(sub);

            console.log("BELL SUB", sub);

            let userId = parseInt(sub);
            console.log("USER ID", userId);
            

            fetch(`http://localhost:5000/api/clear_bell_number`,{
                method:"POST",
                mode:"cors",
               headers: {
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Access-Allow-Control-Origin": "*",
               "Authorization": `Bearer ${token}`
            },
                body:JSON.stringify({
                
                 "userID":userId
                
            })
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
            
            console.log("JSON");
            console.log(json);
  
            })
            .catch(error => {
                
                console.log("BELL ERROR!", error);
                
            });
                  
            
            
        }else{
            setCurrentNotifyStyle(notifyHidden);
        }
    };
    
    
    if(authorName &&
authorId){
        
        return (
        
            <Router>
        
                <Redirect to={`/profile/${authorName}/${authorId}`}/>
                <Switch>
                    <Route exact path={`/profile/${authorName}/${authorId}`} component={Profile}/>
                </Switch>
        </Router>
            
            )
    }
    
    
    return (
    <>
    <li id="bell" onClick={handleNotify}>
        <span id="bell-count" style={toggleBell}>{counting > 0? (counting):(null)}</span>
            <i className="fa fa-bell"></i>
    </li>
       
            
    <div id="notify-div" style={currentNotifyStyle}>
        
       
        {loading? (
            
            <h5>Loading...</h5>
        ):(
             <>
            {notifyList.map((notify, i) => (
            <div key={i} className="notify-container" id={notify.id}>
                <Link onClick = {() => handleRedirectAuthor(notify.author, notify.author_id)} 
                    to={`/profile/${notify.author}/${notify.author_id}`}>
                    
                <img className="notify-user-image" src={notify.author_image}/>
                <div className="notify-username">{notify.author}</div>
                </Link>
                        
                <Link to={`/blog/${notify.username}/${notify.title}/${notify.blog_id}`}>
                    <div className="notify-title">{notify.title}</div>
                </Link>
                <div className="notify-datetime">Posted: {notify.timstamp}</div>
                    
                <span className="notify-text">
                {notify.text}
                </span>
            </div>
               
                    ))}
                 </>
            )}
            
        
    </div>
    </>
    
    );
};

export default withRouter(Bell);
