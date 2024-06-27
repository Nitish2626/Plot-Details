import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { AuthContext } from "../context/AuthContext";
import { useContext  } from "react";
import { logoutUser } from "../helpers/userApiCommunicator";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const TopBar = ({ click, show }) => {

    const navigate = useNavigate();

    const location = useLocation();
    if (location.pathname === "/" || location.pathname === "/signup") {
        return null;
    }

    const auth = useContext(AuthContext);
    let uName = "";
    console.log("auth", auth);
    let sName = auth.user.username.split(' ');

    for (let i = 0; i < sName.length; i++) {
        let n = sName[i];
        let n1 = n.slice(0, 1).toUpperCase();
        uName = uName + n1;
    }

    const handleLogout = async () => {
        const res = await logoutUser();
        if(res.data.status === "401"){
            toast.error(res.data.msg, {
                position: "top-right"
            });
        }
        else if (res.status === 200) {
            navigate("/");
            toast.success(res.data, {
                position: "top-right"
            });
        }
        else {
            toast.error(res.data, {
                position: "top-right"
            });
        }
    }

    return (
        <div className='w-full h-12 sticky top-0 flex items-center justify-between bg-[#242424] px-2 z-50'>
            <button
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black"
                onClick={click}
            >
                {show ?
                    <RxCross2
                        className="w-7 h-7"
                    />
                    :
                    <RxHamburgerMenu
                        className="w-7 h-7"
                    />
                }
            </button>

            <section className="flex items-center gap-4">
                <button
                    onClick={handleLogout}
                    className="w-28 flex items-center justify-center gap-2 text-lg self-center font-semibold rounded-md py-1 bg-black hover:bg-[#242424]"
                >
                    <CgLogOut />
                    Logout
                </button>

                <button
                    className='w-8 h-8 flex items-center justify-center rounded-full bg-black'
                    title='Account-Info'
                >
                    {uName}
                </button>
            </section>
        </div>
    );
};

export default TopBar;