import { Link } from "react-router-dom";
import { FaSortAmountDown } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const SortSearchAndAddPlot = ({ to, search, show }) => {

    return (
        <section
            className='w-full flex items-center justify-center gap-2 px-2 mt-6'
        >
            <button
                onClick={()=> show((prev)=>!prev)}
                title="Sort"
                className='w-9 h-9 flex items-center justify-center bg-gray-950 rounded-md hover:text-gray-400'
            >
                <FaSortAmountDown />
            </button>

            <input
                type='search'
                onInput={(e) => setTimeout(() => {
                    search(e.target.value)
                }, 1500)}
                placeholder="Search"
                title="Search"
                className='w-52 rounded-md px-3 py-2 outline-none bg-gray-950'
            />

            <Link
                to={to}
                title="Add New"
                className='w-9 h-9 flex items-center justify-center bg-gray-950 rounded-md hover:text-gray-400'
            >
                <IoMdAdd />
            </Link>
        </section>
    );
};

export default SortSearchAndAddPlot;