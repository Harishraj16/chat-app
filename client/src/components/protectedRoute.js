import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getloggedUser } from "../apiCalls/user";

export const ProtectedRoute = ({ children }) => {
    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    const getloggedInUser = async ()=>{
        let response = null;
        try{
            response = await getloggedUser();
            if(response.success){
                setUser(response.data);
            }else{
                console.log("hi")
                navigate('./login');
            }
        }catch(err){
            navigate('./login');
        }
    } 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getloggedInUser();
        }else{
            navigate("/login"); 
        }
    }); 

    return (
        <>
        {user && <p>name: {user.firstName+" "+user.secondName} </p>}
        {children}
        </>
    );
};

