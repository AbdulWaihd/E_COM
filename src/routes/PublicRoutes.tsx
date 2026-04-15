import {Navigate,Outlet } from "react-router-dom";

export const PublicRoutes = () => {
    const token=localStorage.getItem("token");
    const user=JSON.parse(localStorage.getItem("user")||"null");

    if(token) return <Navigate to="/"/>;
    if(user) return <Navigate to="/"/>;

return <Outlet/>
};