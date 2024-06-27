import { useContext, useRef, useState, useEffect } from "react";
import FormFields from "./FormFields";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { userLogin } from "../helpers/userApiCommunicator";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { userStatus } from "../helpers/userApiCommunicator";

const LoginForm = () => {

    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    const emailRef = useRef();
    const passwordRef = useRef();

    const [disable, setDisable] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        const userData = {
            email: emailRef.current.value.trim(),
            password: passwordRef.current.value.trim()
        };

        const res = await userLogin(userData);
        if (res.data.status === "404") {
            setDisable(false);
            toast.error(res.data.msg, {
                position: "top-right"
            });
        }
        else if (res.data.status === "403") {
            setDisable(false);
            toast.error(res.data.msg, {
                position: "top-right"
            });
        }
        else if (res.status === 200) {
            emailRef.current.value = "";
            passwordRef.current.value = "";
            setDisable(false);
            console.log("res",res.data.user.username);
            auth.setUser({ username: res.data.user.username, email: res.data.user.email });
            auth.setIsLoggedIn(true);
            navigate("/dashboard");
            toast.success(res.data, {
                position: "top-right"
            });
        }
        else {
            emailRef.current.value = "";
            passwordRef.current.value = "";
            setDisable(false);
            toast.error(res.data, {
                position: "top-right"
            });
        }
    };

    return (
        <div className='w-full flex flex-col items-center justify-center gap-4 z-20 py-4 px-2 mt-5'>
            <h1 className="flex items-center gap-2 text-2xl font-semibold">
                <FiLogIn />
                Login
            </h1>

            <form
                onSubmit={submit}
                className="w-full flex flex-col items-center justify-center gap-3 py-4 bg-black rounded-lg"
            >
                <FormFields
                    reference={emailRef}
                    hf="email"
                    labelText="Email"
                    type="text"
                    ph="e.g. abc@gmail.com"
                />
                <FormFields
                    reference={passwordRef}
                    hf="password"
                    labelText="Password"
                    type="password"
                    ph="e.g. jfdj123"
                />

                <button
                    type="submit"
                    disabled={disable}
                    className="w-28 flex items-center justify-center gap-2 text-lg self-center font-semibold rounded-md py-1 bg-blue-600 mt-4 hover:bg-blue-700 disabled:bg-blue-900"
                >
                    <FiLogIn />
                    Login
                </button>

                <span className="text-gray-400">
                    Don't have an account ?
                    <Link
                        to="/signup"
                        className="text-lg font-semibold text-blue-500 pl-2"
                    >
                        Signup
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default LoginForm;