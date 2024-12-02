import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            
        }else{
            navigate("/login"); 
        }
    }); 

    return <>{children}</>;
};

