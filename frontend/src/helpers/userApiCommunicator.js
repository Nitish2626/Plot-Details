import axios from "axios";

export const userSignup = async (data) => {
    try {
        const res = await axios.post("http://localhost:200/user/signup", data, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("User Signup API Communicator", error);
    }
};

export const userLogin = async (data) => {
    try {
        const res = await axios.post("http://localhost:200/user/login", data, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("User Login API Communicator", error);
    }
};

export const userStatus = async () => {
    try {
        const res = await axios.get("http://localhost:200/user/status", { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("User Status API Communicator", error);
    }
};

export const logoutUser = async () => {
    try {
        const res= await axios.get("http://localhost:200/user/logout",{withCredentials:true});
        console.log("r",res);
        return res;
    }
    catch (error) {
        console.log("Logout User API Communicator",error);
    }
};