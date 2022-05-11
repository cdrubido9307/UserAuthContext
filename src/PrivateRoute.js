
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "./AppContext";

const PrivateRoute = ({ children }) => {
    const appContext = useContext(AppContext);
    return appContext.loggedUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;