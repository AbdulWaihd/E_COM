import {Navigate,Outlet} from "react-router-dom";

export const ProtectedRoutes = () => {
    const token=localStorage.getItem("token");
    const user=JSON.parse(localStorage.getItem("user")||"null");


    if(!token||!user)return <Navigate to="/login" replace/>
    return <Outlet/>
};