import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProtectedRouteElement({ component: Component, ...props }) {

  const { loggedIn } = useSelector((state) => state.login);

  return loggedIn ? <Component {...props} /> : <Navigate to="/" />;
}

export default ProtectedRouteElement;