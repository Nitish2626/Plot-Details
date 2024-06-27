import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { BiArea } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import { AiOutlineBoxPlot } from "react-icons/ai";
import { PiRectangleDashedLight } from "react-icons/pi";
import LeaseInnerSection from "./LeaseInnerSection";
import { Link } from "react-router-dom";

const Plot = ({ id, khatano, plotno, plotName, date, dismil, area, deletePlot }) => {

    let d = new Date(`${date}`);

    let newPlotName = plotName?.split(" ");
    let pName = "";

    for (let i = 0; i < newPlotName?.length; i++) {
        let n = newPlotName[i];
        let n1 = n.slice(0, 1).toUpperCase();
        let newName = n1 + n.slice(1);
        pName = pName + newName + " ";
    }

    return (
        <div
            className="w-72 h-44 flex flex-col items-center bg-gray-950 rounded-xl px-4 py-2"
        >
            <h1
                className="w-full text-lg font-semibold"
            >
                {pName}
            </h1>

            <section
                className="flex items-center justify-center gap-8 mt-4"
            >
                <LeaseInnerSection
                    icon={<FaRegBookmark className="w-5 h-5" />}
                    value={khatano}
                />
                <LeaseInnerSection
                    icon={<AiOutlineBoxPlot className="w-5 h-5" />}
                    value={plotno}
                />
                <LeaseInnerSection
                    icon={<PiRectangleDashedLight className="w-5 h-5" />}
                    value={dismil}
                />
                <LeaseInnerSection
                    icon={<BiArea className="w-5 h-5" />}
                    value={area}
                />

            </section>

            <section className="w-full flex items-center justify-between mt-4">
                <h1 className="w-36">
                    {d.toDateString()}, {d.toLocaleTimeString()}
                </h1>

                <section className="w-36 flex items-center justify-end">
                    <Link
                        to={`/all-plots/update-plot/${id}`}
                        title="Edit"
                        className='w-9 h-9 flex items-center justify-center bg-gray-950 rounded-full hover:bg-[#242424]'
                    >
                        <FiEdit2 className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={() => deletePlot(id)}
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

export default Plot;