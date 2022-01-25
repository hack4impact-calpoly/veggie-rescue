import React from 'react';
import { Navigate,Outlet,Route,RouteProps } from 'react-router-dom';

interface Props extends RouteProps{
    isAuth:boolean;
    redirectTo:string;
}
//This function helps to redirect to login page if auth is false 
const ProtectedRoute = ({isAuth,redirectTo,...routeProps}: Props)=> {
   return isAuth ? <Outlet /> : <Navigate to={redirectTo}/>
}

export default ProtectedRoute;
