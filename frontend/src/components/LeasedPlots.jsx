import Lease from './Lease';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import SortSearchAndAddPlot from './SortSearchAndAddPlot';
import { useEffect, useState } from 'react';
import { getAllLeasedPlots, deleteLeasePlot, sortLeasePlot } from '../helpers/leasedPlotsApiCommunicator';
import Loader from './Loader';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { searchLeasePlot } from "../helpers/leasedPlotsApiCommunicator";
import { useNavigate } from 'react-router-dom';
import RadioButtons from './RadioButtons';

const LeasedPlots = () => {

  const navigate = useNavigate();

  const [allLeasedPlots, setAllLeasedPlots] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    const findAllLeasedPlots = async () => {
      setLoader(true);
      const res = await getAllLeasedPlots();
      if (res.status === 200) {
        const data = res.data;
        setAllLeasedPlots(data);
        setLoader(false);
      }
      else {
        toast.error(res.data, {
          position: "top-right"
        });
        setLoader(false);
      }
    }
    findAllLeasedPlots();
  }, []);

  const handleDeleteLeasePlot = async (id) => {
    const delRes = await deleteLeasePlot(id);
    if (delRes.status === 200) {
      toast.success(delRes.data, {
        position: "top-right"
      });

      setLoader(true);
      const res = await getAllLeasedPlots();
      if (res.status === 200) {
        const data = res.data;
        setAllLeasedPlots(data);
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

    const res = await searchLeasePlot(val);
    if (res.status === 200) {
      const data = res.data;
      setAllLeasedPlots(data);
    }
    else {
      console.log(res.data);
    }
  };

  const handleSort = async (val) => {
    navigate(`?sort=${encodeURIComponent(val)}`);

    const res = await sortLeasePlot(val);
    if (res.status === 200) {
      const data = res.data;
      setAllLeasedPlots(data);
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
        <RiMoneyRupeeCircleLine
          className="w-7 h-7"
        />
        <h1>
          Leased Plots
        </h1>
      </section>

      <SortSearchAndAddPlot
        to="/leased-plots/add-lease"
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
            inputValue="Amount Low To High"
            change={() => handleSort("alth")}
          />
          <RadioButtons
            inputValue="Amount High To Low"
            change={() => handleSort("ahtl")}
          />
          <RadioButtons
            inputValue="Period Low To High"
            change={() => handleSort("plth")}
          />
          <RadioButtons
            inputValue="Period High To Low"
            change={() => handleSort("phtl")}
          />
        </section>
      }

      <section
        className='w-full h-80 flex items-center justify-center flex-wrap gap-4 py-2 mt-2'
      >
        {loader ?
          <Loader />
          :
          allLeasedPlots.length > 0 ? allLeasedPlots.map((d) =>
            <Lease
              key={d._id}
              id={d._id}
              plotName={d.plots}
              rentalName={d.renter}
              period={d.period}
              amount={d.amount + "K"}
              area="40"
              date={d.updatedAt}
              deleteLease={handleDeleteLeasePlot}
            />
          )
            :
            <h1 className="text-xl font-semibold">
              No Leased Plots Found
            </h1>
        }
      </section>
    </div >
  );
};

export default LeasedPlots;