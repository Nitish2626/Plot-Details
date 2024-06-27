import React from 'react'
import { NavLink } from 'react-router-dom';

const Navlinks = ({to,icon,text,click}) => {
    return (
        <NavLink
            to={to}
            className="w-full h-10 flex items-center gap-3 px-2 mb-2 hover:bg-[#242424] hover:rounded-md"
            onClick={()=>click((prev)=>!prev)}
        >
            {icon}
            <h1 className="text-xl">
                {text}
            </h1>
        </NavLink>
    );
};

export default Navlinks;