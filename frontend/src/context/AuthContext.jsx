import { createContext, useEffect, useState } from "react";
import { userStatus } from "../helpers/userApiCommunicator";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ username: "", email: "" });

    // useEffect(() => {
    //     const getUserStatus = async () => {
    //         const res = await userStatus();
    //         console.log("u",res.data);
    //         if (res.data.status === "404") {
    //             setIsLoggedIn(false);
    //             setUser({ username: "", email: "" });
    //         }
    //         else if(res.status === 200) {
    //             setIsLoggedIn(true);
    //             setUser({ username: res.data.username, email: res.data.email });
    //         }
    //         else{
    //             toast.error(res.data, {
    //                 position: "top-right"
    //             });
    //             setIsLoggedIn(false);
    //             setUser({ username: "", email: "" });
    //         }
    //     }
    //     getUserStatus();
    // },[isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}