import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProtectedRouteElement({ component: Component, ...props }) {

  const { loggedIn } = useSelector((state) => state.login);
  const { isAuthChecked } = useSelector((state) => state.profile);

  if (!isAuthChecked) {
    return null;
  }

  if (loggedIn) {
    return <Component {...props} />
  } 
  
  if (!loggedIn) {
    return <Navigate to="/" />
  }
}

export default ProtectedRouteElement;