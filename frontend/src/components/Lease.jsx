import { FaArrowRightLong } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { BiArea } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import LeaseInnerSection from "./LeaseInnerSection";
import { Link } from "react-router-dom";

const Lease = ({ id, plotName, rentalName, period, amount, area, date, deleteLease }) => {
    let plots = "";
    for (let i = 0; i < plotName.length; i++) {
        plots = plots + plotName[i] + ", ";
    }
    plots = plots.slice(0, -2);

    let newDate = new Date(`${date}`);

    let newRentalName=rentalName.split(" ");
    let rName="";

    for(let i=0;i<newRentalName.length;i++){
        let n= newRentalName[i];
        let n1=n.slice(0,1).toUpperCase();
        let newName=n1+n.slice(1);
        rName = rName + newName + " ";
    }

    return (
        <div
            className="w-72 h-48 flex flex-col items-center justify-center bg-gray-950 rounded-xl px-4 py-2"
        >
            <section
                className="w-full flex items-center justify-center gap-2"
            >
                <h1
                    className="w-24 text-lg font-semibold text-nowrap overflow-hidden text-ellipsis"
                >
                    {plots}
                </h1>

                <FaArrowRightLong
                    className="w-24 h-5"
                />

                <h1
                    className="w-24 text-lg font-semibold text-nowrap overflow-hidden text-ellipsis"
                >
                    {rName}
                </h1>
            </section>

            <section
                className="flex items-center justify-center gap-8 mt-4"
            >
                <LeaseInnerSection
                    icon={<IoTimeOutline className="w-5 h-5" />}
                    value={period}
                />
                <LeaseInnerSection
                    icon={<RiMoneyRupeeCircleLine className="w-5 h-5" />}
                    value={amount}
                />
                <LeaseInnerSection
                    icon={<BiArea className="w-5 h-5" />}
                    value={area}
                />
            </section>

            <section className="w-full flex items-center justify-between mt-4">
                <h1 className="w-36">
                    {newDate.toDateString()}, {newDate.toLocaleTimeString()}
                </h1>

                <section className="w-36 flex items-center justify-end">
                    <Link
                        to={`/leased-plots/update-lease/${id}`}
                        title="Edit"
                        className='w-9 h-9 flex items-center justify-center bg-gray-950 rounded-full hover:bg-[#242424]'
                    >
                        <FiEdit2 className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={()=> deleteLease(id)}
                        title="Delete"
                        className='w-9 h-9 flex items-center justify-center bg-gray-950 rounded-full hover:bg-[#242424]'
                    >
                        <MdOutlineDelete className="w-5 h-5" />
                    </button>
                </section>
            </section>
        </div>
    );
};

export default Lease;