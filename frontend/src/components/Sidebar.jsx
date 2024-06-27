import { RxDashboard } from "react-icons/rx";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { BiArea } from "react-icons/bi";
import Navlinks from "./Navlinks";

const Sidebar = ({ click }) => {
    return (
        <nav className="w-52 h-full fixed bg-black px-4 py-4 rounded-2xl z-50">
            <Navlinks
                to="/leased-plots"
                icon={<RiMoneyRupeeCircleLine className="w-5 h-5" />}
                text="Leased Plots"
                click={click}
            />
            <Navlinks
                to="/all-plots"
                icon={<BiArea className="w-5 h-5" />}
                text="All Plots"
                click={click}
            />
        </nav>
    );
};

export default Sidebar;