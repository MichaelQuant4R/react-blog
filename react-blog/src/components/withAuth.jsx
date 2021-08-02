import React from "react";
import { Redirect } from "react-router-dom";
import {User} from "../auth/UserContext";

const withAuth = (Component) => {
    

  const AuthRoute = () => {
      const {user} = React.useContext(User);
    const isAuth = !localStorage.getItem("accessToken");
      
    if (isAuth && user === null) {
      return <Component />;
    } else {
      return <Redirect to="/" />;
    }
  };

  return AuthRoute;
};

export default withAuth;