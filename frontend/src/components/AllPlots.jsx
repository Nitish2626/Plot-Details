import { BiArea } from "react-icons/bi";
import Plot from "./Plot";
import { useEffect, useState } from "react";
import { getAllPlots, searchPlot, sortPlot } from "../helpers/plotsApiCommunicator.js";
import Loader from "./Loader.jsx";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { deletePlot } from "../helpers/plotsApiCommunicator.js";
import SortSearchAndAddPlot from "./SortSearchAndAddPlot.jsx";
import { useNavigate } from "react-router-dom";
import RadioButtons from "./RadioButtons.jsx";

const AllPlots = () => {

  const navigate=useNavigate();

  const [loader, setLoader] = useState(false);
  const [allPlots, setAllPlots] = useState([]);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      const res = await getAllPlots();
      if (res.status === 200) {
        const data = res.data;
        setAllPlots(data);
        setLoader(false);
      }
      else {
        toast.error(res.data, {
          position: "top-right"
        });
        setLoader(false);
      }
    }
    getData();
  }, []);

  const handleDelete = async (id) => {
    const delRes = await deletePlot(id);
    if (delRes.status === 200) {
      toast.success(delRes.data, {
        position: "top-right"
      });

      setLoader(true);
      const res = await getAllPlots();
      if (res.status === 200) {
        const data = res.data;
        setAllPlots(data);
        setLoader(false);
      }
      else {
        toast.error(res.data, {
          position: "top-right"
        });
        setLoader(false);
      }
    }
    else {
      toast.error(delRes.data, {
        position: "top-right"
      });
    }
  };

  const inputSearch = async (val) => {
    navigate(`?search=${encodeURIComponent(val)}`);

    const res = await searchPlot(val);
    if (res.status === 200) {
      const data = res.data;
      setAllPlots(data);
    }
    else {
      console.log(res.data);
    }
  };

  const handleSort = async (val) => {
    navigate(`?sort=${encodeURIComponent(val)}`);

    const res = await sortPlot(val);
    if (res.status === 200) {
      const data = res.data;
      setAllPlots(data);
      setShowSort(false);
    }
    else {
      console.log(res.data);
      setShowSort(false);
    }
  };

  return (
    <div className='w-full'>
      <section
        className='flex items-center justify-center gap-2 text-2xl font-semibold mt-5'
      >
        <BiArea
          className="w-7 h-7"
        />
        <h1>
          All Plots
        </h1>
      </section>

      <SortSearchAndAddPlot
        to="/all-plots/add-plot"
        search={inputSearch}
        show={setShowSort}
      />
      
      {showSort &&
        <section className='w-56 absolute top-36 left-4 flex flex-col bg-[#242424] rounded-lg py-1 px-2'>
          <RadioButtons
            inputValue="Newest First"
            change={() => handleSort("nf")}
          />
          <RadioButtons
            inputValue="Oldest First"
            change={() => handleSort("of")}
          />
          <RadioButtons
            inputValue="Plot No. Low To High"
            change={() => handleSort("plth")}
          />
          <RadioButtons
            inputValue="Plot No. High To Low"
            change={() => handleSort("phtl")}
          />
          <RadioButtons
            inputValue="Dismil Low To High"
            change={() => handleSort("dlth")}
          />
          <RadioButtons
            inputValue="Dismil High To Low"
            change={() => handleSort("dhtl")}
          />
          <RadioButtons
            inputValue="Area Low To High"
            change={() => handleSort("alth")}
          />
          <RadioButtons
            inputValue="Area High To Low"
            change={() => handleSort("ahtl")}
          />
        </section>
      }

      <section
        className='w-full h-80 flex items-center justify-center flex-wrap gap-4 py-2 mt-2'
      >
        {loader ?
          <Loader />
          :
          allPlots.length > 0 ? allPlots.map((p) =>
            <Plot
              key={p._id}
              id={p._id}
              khatano={p.khatano}
              plotno={p.plotno}
              plotName={p.plotname}
              dismil={p.dismil}
              area={p.area}
              date={p.updatedAt}
              deletePlot={handleDelete}
            />
          )
            :
            <h1 className="text-xl font-semibold">
              No Plots Found
            </h1>
        }

      </section>
    </div>
  );
};

export default AllPlots;