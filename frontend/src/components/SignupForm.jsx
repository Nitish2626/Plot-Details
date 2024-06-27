import { useRef, useState } from "react";
import FormFields from "./FormFields";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { userSignup } from "../helpers/userApiCommunicator";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {

    const navigate=useNavigate();

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [disable, setDisable] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setDisable(true);
        const userData = {
            username: usernameRef.current.value.trim(),
            email: emailRef.current.value.trim(),
            password: passwordRef.current.value.trim()
        };
        
        const res = await userSignup(userData);
        if (res.status === 200) {
            usernameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            setDisable(false);
            toast.error(res.data, {
                position: "top-right"
            });
        }
        else if (res.status === 201) {
            usernameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            setDisable(false);
            navigate("/");
            toast.success(res.data, {
                position: "top-right"
            });
        }
        else {
            usernameRef.current.value = "";
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
                <FaUserPlus />
                Signup
            </h1>

            <form
                onSubmit={submit}
                className="w-full flex flex-col items-center justify-center gap-3 py-4 bg-black rounded-lg"
            >
                <FormFields
                    reference={usernameRef}
                    hf="username"
                    labelText="Username"
                    type="text"
                    ph="e.g. Robin"
                />
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
                    <FaUserPlus />
                    Signup
                </button>

                <span className="text-gray-400">
                    Already have an account ?
                    <Link
                        to="/"
                        className="text-lg font-semibold text-blue-500 pl-2"
                    >
                        Login
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default SignupForm;