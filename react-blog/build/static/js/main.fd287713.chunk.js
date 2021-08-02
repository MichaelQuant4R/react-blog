(this["webpackJsonpreact-blog"]=this["webpackJsonpreact-blog"]||[]).push([[0],{31:function(e,t,n){},32:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var o=n(1),c=n.n(o),s=n(25),a=n.n(s),r=(n(31),n(2)),i=n(3),l=n(4),j=c.a.createContext(null),u=(n(32),n(0)),h=function(e){return Object(u.jsx)(u.Fragment,{children:Object(u.jsx)("footer",{})})},b=n(6),d=n.n(b),O=n(11),g=(n(35),n(36),{borderRadius:"50%",height:"50px",width:"50px"}),m=function(){var e=c.a.useState(!0),t=Object(r.a)(e,2),n=t[0],s=t[1],a=c.a.useState(null),l=Object(r.a)(a,2),j=(l[0],l[1]),h=c.a.useState(!1),b=Object(r.a)(h,2),m=b[0],p=b[1],x=window.location.origin,f=Object(o.useRef)(0),S=Object(o.useState)({list:[]}),v=Object(r.a)(S,2),E=v[0],w=v[1],N=Object(o.useState)(0),A=Object(r.a)(N,2),T=A[0],R=A[1],C=Object(o.useRef)(null);Object(o.useEffect)((function(){var e=new IntersectionObserver(I,{root:null,rootMargin:"20px",threshold:1});console.log("loader",C.current),C.current&&e.observe(C.current)}),[]);var y=function(){var e=Object(O.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("FETCH!",t),m||fetch("".concat(x,"/api/blog_page/").concat(t),{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Allow-Control-Origin":"*"}}).then((function(e){if(e.ok)return e.json();throw new Error(e.status)})).then((function(e){console.log("JSON",e);var t=e.scroll;f.current=e.max,console.log("CHECK LENGTH!",f.current,e.blogs.length),f.current!==e.blogs.length||f.current===e.blogs.length?t?(j(e.blogs),console.log("BLOGS",e.blogs),w({list:e.blogs}),f.current===e.blogs.length&&(p(!0),s(!1)),console.log("MAX!",e.max,f.current)):(console.log("STOP SCROLLING"),s(!1)):(p(!0),console.log("FINISHED LOADING!"),s(!1))})).catch((function(e){console.log(e)}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(o.useEffect)((function(){y(T)}),[T]);var I=function(e){var t=e[0];m||t.isIntersecting&&R((function(e){return e+1}))};return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("h4",{children:["Max: ",f.current]}),Object(u.jsx)("div",{className:"blog-container",children:Object(u.jsxs)("div",{className:"post-list",children:[E.list.map((function(e,t){return Object(u.jsx)("div",{className:"blog-post",children:Object(u.jsxs)("div",{children:[Object(u.jsxs)("h2",{children:[" ",e.title," "]}),Object(u.jsx)("img",{style:g,src:e.image}),Object(u.jsx)(i.b,{to:"/profile/".concat(e.author,"/").concat(e.user_id),children:Object(u.jsxs)("h4",{children:["Author: ",e.author]})}),Object(u.jsxs)("h5",{children:["Posted: ",e.timestamp]}),Object(u.jsx)(i.b,{to:"/blog/".concat(e.author,"/").concat(e.title,"/").concat(e.id),children:Object(u.jsx)("span",{children:"Read More"})}),Object(u.jsx)("p",{children:e.text})]})},t)})),n?Object(u.jsx)("div",{className:"loader",ref:C}):Object(u.jsx)("div",{children:"Finished"})]})})]})},p=function(e){var t=c.a.useContext(j).user;return c.a.useEffect((function(){console.log("USER",t)}),[t]),Object(u.jsxs)("div",{children:[Object(u.jsx)("h4",{children:"Home page"}),Object(u.jsx)("div",{children:JSON.stringify({user:t})}),Object(u.jsx)(m,{}),Object(u.jsx)(h,{})]})},x=function(e){var t=c.a.useContext(j).user;return Object(u.jsxs)("div",{children:[Object(u.jsx)("h4",{children:"About page"}),Object(u.jsx)("div",{children:JSON.stringify({user:t})})]})},f=n(10),S=n(16),v=n(17),E=n(13),w=n(19),N=n(18),A=n(14),T=function(e){var t=c.a.useState(""),n=Object(r.a)(t,2),o=n[0],s=n[1],a=c.a.useState(""),i=Object(r.a)(a,2),l=i[0],j=i[1],h=c.a.useState(!1),b=Object(r.a)(h,2),d=b[0],O=b[1],g=c.a.useState(!1),m=Object(r.a)(g,2),p=m[0],x=m[1],S=window.location.origin,v=c.a.useRef(""),E=c.a.useRef("");c.a.useEffect((function(){console.log("BLOG EFFECT!")}),[]);return Object(u.jsx)("div",{children:Object(u.jsxs)("center",{children:[Object(u.jsx)("h4",{children:"Post a new Blog"}),Object(u.jsx)("hr",{}),d?Object(u.jsx)("h4",{children:"Error! Invalid inputs. Please try again"}):null,p?Object(u.jsx)("h4",{children:"Success! You've posted a new blog"}):null,Object(u.jsxs)("form",{id:"blog-container",onSubmit:function(e){e.preventDefault(),console.log("POST BLOG!"),console.log("DATA!",l,o);var t=localStorage.getItem("accessToken"),n=l.title,c=o.text;fetch("".concat(S,"/api/post_blog"),{method:"POST",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Allow-Control-Origin":"*",Authorization:"Bearer ".concat(t)},body:JSON.stringify({titleData:n,textData:c})}).then((function(e){if(e.ok)return e.json();throw new Error(e.status)})).then((function(e){console.log("JSON BLOG",e),e.blog?(x(!0),O(!1),j(""),s(""),v.current.value="",E.current.value=""):(x(!1),O(!0))})).catch((function(e){console.log(e)}))},children:[Object(u.jsx)("label",{children:"Title"}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{ref:E,type:"text",name:"title",placeholder:"Add a title...",required:!0,onChange:function(e){j(Object(f.a)({},e.target.name,e.target.value))}}),Object(u.jsx)("br",{}),Object(u.jsx)("br",{}),Object(u.jsx)("textarea",{ref:v,placeholder:"Say something cool!",name:"text",required:!0,onChange:function(e){s(Object(f.a)({},e.target.name,e.target.value))}}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{type:"submit",value:"Post"})]})]})})},R=(n(42),function(e){Object(w.a)(n,e);var t=Object(N.a)(n);function n(e){var o,c;return Object(S.a)(this,n),(c=t.call(this,e)).handleInfo=function(e,t,n){console.log("HANDLE INFO!"),console.log(e,t,n),fetch("".concat(c.state.urlPath,"/api/view_profile/").concat(e,"/").concat(t),{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Allow-Control-Origin":"*"}}).then((function(e){if(e.ok)return e.json();throw new Error(e.status)})).then((function(o){console.log("JSON!"),console.log(o);var s=o[1],a=parseInt(t);o[0].view?null!==n?(c.setState({loading:!1}),e===s.username&&a===s.id&&a!==n?(c.setState({image:s.image}),c.setState({id:s.id}),c.setState({username:s.username}),c.setState({email:s.email}),c.setState({blog:!1})):e===s.username&&a===s.id&&a===n?(c.setState({image:s.image}),c.setState({id:s.id}),c.setState({username:s.username}),c.setState({email:s.email}),c.setState({blog:!0})):(console.log("NOT THE SAME USER TEST!"),c.setState({id:s.id}),c.setState({username:s.username}),c.setState({image:s.image}),c.setState({blog:!1}))):(c.setState({id:s.id}),c.setState({username:s.username}),c.setState({image:s.image}),c.setState({loading:!1}),c.setState({exist:!0}),c.setState({blog:!1})):(c.setState({loading:!1}),c.setState({exist:!0}),c.setState({blog:!1}))})).catch((function(e){console.log(e),console.log("CATCH ERROR!")}))},c.state=(o={image:"No Image...",username:"",id:"",email:"",blog:!1,loading:!0,user:null,jwtId:null},Object(f.a)(o,"user","No data"),Object(f.a)(o,"urlPath",window.location.origin),o),c.handleInfo=c.handleInfo.bind(Object(E.a)(c)),c}return Object(v.a)(n,[{key:"componentDidMount",value:function(){var e=this.context,t=localStorage.getItem("accessToken");if(console.log("USER",e),null!==e)if(this.props.match.params!=={}){if(this.setState({username:this.props.match.params.username}),this.setState({id:this.props.match.params.id}),t){var n=Object(A.a)(t).sub,o=this.props.match.params.username,c=parseInt(this.props.match.params.id);console.log(typeof c,typeof n),this.handleInfo(o,c,n)}}else this.setState({user:e.user}),this.setState({username:e.user.username}),this.setState({id:e.user.id}),this.setState({image:e.user.image}),this.setState({email:e.user.email}),this.setState({blog:!0}),this.setState({loading:!1}),console.log("EMAIL",e.user.email,this.state.email);else if(this.setState({username:this.props.match.params.username}),this.setState({id:this.props.match.params.id}),t){var s=Object(A.a)(t).sub,a=this.props.match.params.username,r=parseInt(this.props.match.params.id);console.log(typeof r,typeof s),this.handleInfo(a,r,s)}else console.log("ELSE",this.props.match.params),this.handleInfo(this.props.match.params.username,this.props.match.params.id,null)}},{key:"render",value:function(){return Object(u.jsx)("div",{children:Object(u.jsx)("center",{children:Object(u.jsx)(u.Fragment,{children:this.state.loading?Object(u.jsx)("h4",{children:"Loading page...."}):Object(u.jsx)(u.Fragment,{children:this.state.exist?Object(u.jsx)("h4",{children:"This profile does not exist"}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("br",{}),Object(u.jsxs)("div",{id:"profile-container",children:[Object(u.jsx)("img",{id:"profile-image",src:this.state.image,alt:"MISSING>>>>"}),Object(u.jsxs)("h4",{children:["My Email: ",this.state.email]}),Object(u.jsxs)("h4",{children:["Username: ",Object(u.jsx)("span",{id:"profile-username",children:this.state.username})]}),Object(u.jsx)(u.Fragment,{children:this.state.blog?Object(u.jsx)(T,{}):null})]})]})})})})})}}]),n}(c.a.Component));R.contextType=j;var C=R,y=function(e){var t=c.a.useRef(""),n=c.a.useRef(""),o=window.location.origin,s=c.a.useContext(j),a=(s.user,s.setUser),r=Object(l.g)();return Object(u.jsxs)("div",{children:[Object(u.jsxs)("center",{children:[Object(u.jsx)("h4",{children:"This is the Login page"}),Object(u.jsx)("hr",{}),Object(u.jsxs)("form",{id:"form-container",onSubmit:function(c){c.preventDefault(),console.log(c),console.log(t.current.value,n.current.value),fetch("".concat(o,"/api/login"),{method:"POST",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Allow-Control-Origin":"*"},body:JSON.stringify({email:t.current.value,password:n.current.value})}).then((function(e){if(console.log(e.ok),console.log(e.status),console.log(e),e.ok)return e.json();throw new Error(e.status)})).then((function(o){if(console.log("JSON"),console.log(o),o[0].login){var c=[],s=o[1],i=o[2];console.log("USER JSON LOGIN",i),c.push(i.username),c.push(i.image),c.push(i.id),c.push(i.email),console.log("LOGIN CACHING!"),caches.open("currentUser").then((function(e){e.addAll(c).then((function(){console.log("LIST DATA SAVED LOGIN!")}))})),console.log("USER JSON",i),a(i),localStorage.setItem("accessToken",s),console.log("LOGIN PROPS",e),r.push("/profile/".concat(i.username,"/").concat(i.id)),t.current="",n.current="",console.log("LOGIN REFS",t.current.value,n.current.value)}else console.log("LOGIN ERROR!")})).catch((function(e){console.log(e),console.log("LOGIN ERROR")}))},children:[Object(u.jsx)("label",{children:"Email"}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{type:"email",name:"email",ref:t,placeholder:"Enter email...",required:!0}),Object(u.jsx)("br",{}),Object(u.jsx)("label",{children:"Password"}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{type:"password",name:"password",ref:n,placeholder:"Enter password...",required:!0}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{type:"submit",value:"Login"})]})]}),Object(u.jsx)(h,{})]})},I=function(e){return function(){var t=c.a.useContext(j).user;return!localStorage.getItem("accessToken")&&null===t?Object(u.jsx)(e,{}):Object(u.jsx)(l.a,{to:"/"})}}((function(e){var t=c.a.useContext(j).user,n=c.a.useState(""),o=Object(r.a)(n,2),s=o[0],a=o[1],b=c.a.useState(""),d=Object(r.a)(b,2),O=d[0],g=d[1],m=c.a.useState(""),p=Object(r.a)(m,2),x=p[0],S=p[1],v=c.a.useState(""),E=Object(r.a)(v,2),w=E[0],N=E[1],A=c.a.useState(!1),T=Object(r.a)(A,2),R=T[0],C=T[1],I=window.location.origin;return c.a.useEffect((function(){console.log("SIGN UP EFFECT!"),console.log("USER",t)}),[t]),R?Object(u.jsxs)(i.a,{children:[Object(u.jsx)(l.a,{to:"/login"}),Object(u.jsx)(l.d,{children:Object(u.jsx)(l.b,{exact:!0,path:"/login",component:y})})]}):Object(u.jsxs)("div",{children:[Object(u.jsxs)("center",{children:[Object(u.jsx)("h4",{children:"This is the Signup page"}),Object(u.jsx)("hr",{}),Object(u.jsxs)("form",{id:"form-container",onSubmit:function(e){e.preventDefault(),console.log(e),console.log("SIGNED UP!",s,O,x,w);var t=s.username,n=O.email,o=x.password,c=w.confirmPassword;fetch("".concat(I,"/api/signup"),{method:"POST",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Allow-Control-Origin":"*"},body:JSON.stringify({usernameData:t,emailData:n,passwordData:o,confirmPasswordData:c})}).then((function(e){if(console.log(e.ok),console.log(e.status),console.log(e),e.ok)return e.json();throw new Error(e.status)})).then((function(e){console.log("JSON"),console.log(e),e[0].signup?C(!0):(console.log("SIGN UP ERROR!"),C(!1))})).catch((function(e){console.log(e),console.log("ERROR")}))},children:[Object(u.jsx)("label",{children:"Username"}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{type:"text",name:"username",onChange:function(e){a(Object(f.a)({},e.target.name,e.target.value))},placeholder:"Enter username...",required:!0}),Object(u.jsx)("br",{}),Object(u.jsx)("label",{children:"Email"}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{type:"email",name:"email",onChange:function(e){g(Object(f.a)({},e.target.name,e.target.value))},placeholder:"Enter email...",required:!0}),Object(u.jsx)("br",{}),Object(u.jsx)("label",{children:"Password"}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{type:"password",name:"password",onChange:function(e){S(Object(f.a)({},e.target.name,e.target.value))},placeholder:"Enter password...",required:!0}),Object(u.jsx)("br",{}),Object(u.jsx)("label",{children:"Confirm Password"}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{type:"password",name:"confirmPassword",onChange:function(e){N(Object(f.a)({},e.target.name,e.target.value))},placeholder:"Confirm password...",required:!0}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{type:"submit",value:"Sign up"})]})]}),Object(u.jsx)(h,{})]})}));var L=function(e){return Object(u.jsx)("div",{children:Object(u.jsxs)("h3",{children:["No match for ",Object(u.jsx)("code",{children:e.location.pathname})]})})},k=(n(43),function(e){var t=c.a.useRef(""),n=c.a.useRef(0),o=Object(l.h)(),s=o.username,a=o.title,j=o.id,h=c.a.useState([]),b=Object(r.a)(h,2),g=b[0],m=b[1],p=window.location.origin,x=function(){var e=Object(O.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("BLOG ID FETCH COMMENTS!",t),fetch("".concat(p,"/api/get_comments/").concat(t),{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Allow-Control-Origin":"*"}}).then((function(e){if(e.ok)return e.json();throw new Error(e.status)})).then((function(e){console.log("JSON!"),console.log(e),m(e.comments)})).catch((function(e){console.log("GET COMMENTS ERROR!"),console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return c.a.useEffect((function(){x(j),console.log("BLOG URL",s,a,j),console.log(typeof j),n.current=parseInt(j),console.log("comments!"),console.log("BLOG REF ID",n.current)}),[j,a,s]),Object(u.jsxs)("div",{children:[Object(u.jsx)("h4",{children:"Comments Page"}),Object(u.jsxs)("form",{id:"comment-container",onSubmit:function(e){e.preventDefault(),console.log("HANDLE COMMENT!");var o=t.current.value,c=t,s=n.current;console.log(t.current.value);var a=localStorage.getItem("accessToken");c.current.value="",fetch("".concat(p,"/api/new_comment"),{method:"POST",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Allow-Control-Origin":"*",Authorization:"Bearer ".concat(a)},body:JSON.stringify({text:o,blogID:s})}).then((function(e){if(e.ok)return e.json();throw new Error(e.status)})).then((function(e){console.log("JSON",e),x(s)})).catch((function(e){console.log(e)}))},children:[Object(u.jsx)("textarea",{id:"comment-textarea",ref:t,placeholder:"Add a comment..",required:!0}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{type:"submit",value:"Comment"})]}),Object(u.jsx)("br",{}),Object(u.jsx)("hr",{}),Object(u.jsxs)("div",{id:"comment-div",children:[g.map((function(e,t){return Object(u.jsxs)("div",{className:"comment-container",children:[Object(u.jsxs)("div",{className:"comment-user-info",children:[Object(u.jsxs)(i.b,{to:"/profile/".concat(e.author,"/").concat(e.user_id),children:[Object(u.jsx)("img",{className:"comment-image",src:e.image}),Object(u.jsxs)("h4",{className:"comment-author",children:[" ",e.author]})]}),Object(u.jsx)("span",{className:"comment-timestamp",children:e.timestamp})]}),Object(u.jsx)("div",{className:"comment-text",children:e.comment})]},t)})),Object(u.jsx)("br",{})]})]})}),P=(n(44),function(e){Object(w.a)(n,e);var t=Object(N.a)(n);function n(e){var o;return Object(S.a)(this,n),(o=t.call(this,e)).fetchBlog=function(){var e=Object(O.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("FETCH BLOG DATA!"),fetch("".concat(o.state.urlPath,"/api/blog/").concat(t),{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Allow-Control-Origin":"*"}}).then((function(e){if(e.ok)return e.json();throw new Error(e.status)})).then((function(e){if(console.log("ONE BLOG JSON!"),console.log(e),console.log("EXISTS",e.exists),e.exists){var t=e.blog[0].author,n=e.blog[0].text,c=e.blog[0].id,s=e.blog[0].title,a=e.blog[0].timestamp,r=e.blog[0].image;o.setState({username:t}),o.setState({id:c}),o.setState({text:n}),o.setState({title:s}),o.setState({loading:!1}),o.setState({exist:!1}),o.setState({timestamp:a}),o.setState({image:r})}else console.log("This blog does not exist!"),o.setState({loading:!1}),o.setState({exist:!0})})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),o.state={username:"",title:"",id:"",text:"",data:null,loading:!0,exist:!1,timestamp:null,image:"No image...",urlPath:window.location.origin},o.fetchBlog=o.fetchBlog.bind(Object(E.a)(o)),o}return Object(v.a)(n,[{key:"componentDidMount",value:function(){console.log("BLOG POST MOUNTED!"),console.log("BLOG POST PARAMS",this.props.match.params.username,this.props.match.params.title,this.props.match.params.id),console.log("BLOG DATA!",this.props.blogData),console.log("PROPS",this.props),console.log("HISTORY",this.props.history),this.fetchBlog(this.props.match.params.id)}},{key:"render",value:function(){return Object(u.jsx)("div",{children:Object(u.jsx)(u.Fragment,{children:this.state.loading?Object(u.jsx)("h4",{children:"Loading..."}):Object(u.jsx)(u.Fragment,{children:this.state.exist?Object(u.jsx)("h4",{children:"This blog does not exist or has been deleted"}):Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("center",{children:[Object(u.jsx)("h4",{children:"This is a Blog post page"}),Object(u.jsxs)("div",{id:"blog-container",children:[Object(u.jsx)("h2",{children:this.state.title}),Object(u.jsxs)(i.b,{to:"/profile/".concat(this.state.username,"/").concat(this.state.id),children:[Object(u.jsx)("img",{id:"blog-author-image",src:this.state.image}),Object(u.jsxs)("h4",{children:["Author: ",this.state.username]})]}),Object(u.jsxs)("h4",{children:["Posted: ",this.state.timestamp]}),Object(u.jsx)("p",{children:this.state.text})]}),Object(u.jsx)("hr",{}),Object(u.jsx)(k,{})]})})})})})}}]),n}(c.a.Component)),B=Object(l.i)(P);var D=Object(l.i)((function(e){return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("ul",{id:"navbar",children:[Object(u.jsx)("li",{className:"navbar-li",children:Object(u.jsx)(i.b,{to:"/",children:"Home"})}),Object(u.jsx)("li",{className:"navbar-li",children:Object(u.jsx)(i.b,{to:"/about",children:"About"})}),Object(u.jsx)("li",{className:"navbar-li",children:Object(u.jsx)(i.b,{to:"/blogs",children:"Blogs"})}),Object(u.jsx)("li",{className:"navbar-li",children:Object(u.jsx)(i.b,{to:"/login",children:"Login"})}),Object(u.jsx)("li",{className:"navbar-li",children:Object(u.jsx)(i.b,{to:"/signup",children:"Sign up"})})]}),Object(u.jsx)("br",{}),Object(u.jsxs)(l.d,{children:[Object(u.jsx)(l.b,{exact:!0,path:"/",component:p}),Object(u.jsx)(l.b,{exact:!0,path:"/about",component:x}),Object(u.jsx)(l.b,{exact:!0,path:"/blogs",component:m}),Object(u.jsx)(l.b,{exact:!0,path:"/login",children:Object(u.jsx)(y,{setLoginProfile:function(t,n){console.log("USERNAME ID",t,n),e.navbarLogin(t,n)}})}),Object(u.jsx)(l.b,{exact:!0,path:"/signup",component:I}),Object(u.jsx)(l.b,{exact:!0,path:"/profile/:username/:id",component:C}),Object(u.jsx)(l.b,{exact:!0,path:"/blog/:username/:title/:id",component:B}),Object(u.jsx)(l.b,{component:L,path:"*"})]})]})})),G=n(7),F=(n(45),{marginRight:"-320px",transition:"0.2s ease-out"}),U={marginRight:"0px",transition:"0.2s ease-in"},M={backgroundColor:"rgba(220, 50, 50, 0.9)"},H={backgroundColor:"Transparent"},J=Object(l.i)((function(e){var t=c.a.useState(F),n=Object(r.a)(t,2),o=n[0],s=n[1],a=c.a.useState([]),j=Object(r.a)(a,2),h=j[0],b=j[1],g=c.a.useState(!0),m=Object(r.a)(g,2),p=m[0],x=m[1],f=c.a.useState(!1),S=Object(r.a)(f,2),v=S[0],E=S[1],w=window.location.origin,N=c.a.useState(H),T=Object(r.a)(N,2),R=T[0],y=T[1],I=c.a.useState(!1),L=Object(r.a)(I,2),k=L[0],P=L[1],B=c.a.useState(!1),D=Object(r.a)(B,2),G=D[0],J=D[1],_=c.a.useState(0),q=Object(r.a)(_,2),V=q[0],z=q[1],Y=function(){var e=Object(O.a)(d.a.mark((function e(t,n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:v?y(M):fetch("".concat(w,"/api/notify/").concat(t),{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Allow-Control-Origin":"*",Authorization:"Bearer ".concat(n)}}).then((function(e){if(e.ok)return e.json();throw new Error(e.status)})).then((function(e){if(console.log("BELL JSON!",e),E(!0),e.check){console.log(e.new);for(var t=0,n=0;n<e.new.length;n++)console.log(n),!0===e.new[n].bell&&(console.log(n,e.new[n].bell),t+=1);t>0&&(y(M),z(t)),b(e.new),x(!1)}else x(!1)})).catch((function(e){console.log("ERROR BELL!",e),x(!1)}));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),K=function(){var e=Object(O.a)(d.a.mark((function e(){var t,n,o,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,localStorage.getItem("accessToken");case 2:return t=e.sent,console.log("BELL TOKEN",t),e.next=6,Object(A.a)(t);case 6:n=e.sent,console.log("BELL DECODED!",n),console.log(n),o=n.sub,console.log("BELL SUB",o),c=parseInt(o),Y(c,t);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();c.a.useEffect((function(){K()}),[]);var W=function(){var e=Object(O.a)(d.a.mark((function e(t){var n,c,a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("0px"===o.marginRight){e.next=19;break}return s(U),y(H),z(0),e.next=6,localStorage.getItem("accessToken");case 6:return n=e.sent,e.next=9,Object(A.a)(n);case 9:c=e.sent,console.log("HANDLE NOTIFY",c),a=c.sub,console.log(a),console.log("BELL SUB",a),r=parseInt(a),console.log("USER ID",r),fetch("".concat(w,"/api/clear_bell_number"),{method:"POST",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Allow-Control-Origin":"*",Authorization:"Bearer ".concat(n)},body:JSON.stringify({userID:r})}).then((function(e){if(e.ok)return e.json();throw new Error(e.status)})).then((function(e){console.log("JSON"),console.log(e)})).catch((function(e){console.log("BELL ERROR!",e)})),e.next=20;break;case 19:s(F);case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return k&&G?Object(u.jsxs)(i.a,{children:[Object(u.jsx)(l.a,{to:"/profile/".concat(k,"/").concat(G)}),Object(u.jsx)(l.d,{children:Object(u.jsx)(l.b,{exact:!0,path:"/profile/".concat(k,"/").concat(G),component:C})})]}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("li",{id:"bell",onClick:W,children:[Object(u.jsx)("span",{id:"bell-count",style:R,children:V>0?V:null}),Object(u.jsx)("i",{className:"fa fa-bell"})]}),Object(u.jsx)("div",{id:"notify-div",style:o,children:p?Object(u.jsx)("h5",{children:"Loading..."}):Object(u.jsx)(u.Fragment,{children:h.map((function(e,t){return Object(u.jsxs)("div",{className:"notify-container",id:e.id,children:[Object(u.jsxs)(i.b,{onClick:function(){return t=e.author,n=e.author_id,P(t),void J(n);var t,n},to:"/profile/".concat(e.author,"/").concat(e.author_id),children:[Object(u.jsx)("img",{className:"notify-user-image",src:e.author_image}),Object(u.jsx)("div",{className:"notify-username",children:e.author})]}),Object(u.jsx)(i.b,{to:"/blog/".concat(e.username,"/").concat(e.title,"/").concat(e.blog_id),children:Object(u.jsx)("div",{className:"notify-title",children:e.title})}),Object(u.jsxs)("div",{className:"notify-datetime",children:["Posted: ",e.timstamp]}),Object(u.jsx)("span",{className:"notify-text",children:e.text})]},t)}))})})]})})),_=Object(l.i)((function(e){Object(G.a)();var t=c.a.useState(!1),n=Object(r.a)(t,2),o=n[0];n[1];return o&&(i.a,l.a,"/profile/".concat(e.username,"/").concat(e.id),l.d,l.b,"/profile/".concat(e.username,"/").concat(e.id)),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("ul",{id:"navbar",children:[Object(u.jsx)("li",{className:"navbar-li",children:Object(u.jsx)(i.b,{to:"/",children:"Home"})}),Object(u.jsx)("li",{className:"navbar-li",id:"navbar-profile",children:Object(u.jsx)(i.b,{to:"/profile/".concat(e.username,"/").concat(e.id),children:e.username})}),Object(u.jsx)("li",{className:"navbar-li",children:Object(u.jsx)(i.b,{to:"/blogs",children:"Blogs"})}),Object(u.jsx)("li",{className:"navbar-li",onClick:function(t){console.log("LOGOUT!"),e.navbarAuth()},children:Object(u.jsx)(i.b,{to:"/login",children:"Logout"})}),Object(u.jsx)(J,{})]}),Object(u.jsx)("br",{}),Object(u.jsxs)(l.d,{children:[Object(u.jsx)(l.b,{exact:!0,path:"/",component:p}),Object(u.jsx)(l.b,{exact:!0,path:"/blogs",component:m}),Object(u.jsx)(l.b,{exact:!0,path:"/login",component:y}),Object(u.jsx)(l.b,{exact:!0,path:"/profile/:username/:id",component:C}),Object(u.jsx)(l.b,{exact:!0,path:"/blog/:username/:title/:id",component:B}),Object(u.jsx)(l.b,{component:L,path:"*"})]})]})})),q=(n(46),function(e){var t=c.a.useState(null),n=Object(r.a)(t,2),o=n[0],s=n[1],a=c.a.useState(!1),h=Object(r.a)(a,2),b=(h[0],h[1],c.a.useState("")),d=Object(r.a)(b,2),O=d[0],g=d[1],m=c.a.useState(""),p=Object(r.a)(m,2),x=p[0],f=p[1],S=Object(l.g)(),v=c.a.useMemo((function(){return{user:o,setUser:s}}),[o,s]);return c.a.useEffect((function(){var t=localStorage.getItem("accessToken");if(caches.open("currentUser").then((function(e){e.keys().then((function(e){console.log(e)}))})),null===o&&null!==t){var n=[];fetch("http://localhost:5000/api/auth",{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Allow-Control-Origin":"*",Authorization:"Bearer ".concat(t)}}).then((function(e){if(e.ok)return e.json();throw new Error(e.status)})).then((function(e){console.log("JSON!"),console.log(e);var t=e.auth;t?(g(e.username),f(e.id),s(e),caches.has("currentUser").then((function(t){t||(n.push(e.username),n.push(e.id),n.push(e.image),console.log("ADDING NEW CACHES FOR NEW CURRENT USER!"),caches.open("currentUser").then((function(e){e.addAll(n).then((function(){console.log("CACHE LIST",n)}))})))}))):console.log("NOT CHECK AUTH NAVBAR",t)})).catch((function(t){console.log("NAVBAR ERROR!"),console.log(t),localStorage.removeItem("accessToken"),console.log("PROPS!",e),console.log("HISTORY ERROR",S)}))}}),[]),Object(u.jsx)(u.Fragment,{children:null!==o||localStorage.getItem("accessToken")?Object(u.jsx)(u.Fragment,{children:Object(u.jsx)(j.Provider,{value:v,children:Object(u.jsx)(i.a,{children:Object(u.jsx)(_,{navbarAuth:function(e){console.log("LOGOUT USER FROM APP"),s(null),console.log("APP USER",o),console.log("VALUE",v),g(""),f(""),v.user=null,console.log("AFTER VALUE",v),localStorage.removeItem("accessToken"),caches.delete("currentUser").then((function(){console.log("CACHE CURRENT USER REMOVED!")}))},username:O,id:x})})})}):Object(u.jsx)(u.Fragment,{children:Object(u.jsx)(j.Provider,{value:v,children:Object(u.jsx)(i.a,{children:Object(u.jsx)(D,{})})})})})}),V=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,48)).then((function(t){var n=t.getCLS,o=t.getFID,c=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),o(e),c(e),s(e),a(e)}))};a.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(q,{})}),document.getElementById("root")),V()}},[[47,1,2]]]);
//# sourceMappingURL=main.fd287713.chunk.js.map