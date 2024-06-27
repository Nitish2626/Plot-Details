import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { getAllPlotsName } from "../helpers/plotsApiCommunicator";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import FormFields from "./FormFields";
import { MdKeyboardBackspace } from "react-icons/md";
import { singleLeasedPlot, updateLeasePlot } from "../helpers/leasedPlotsApiCommunicator";

const UpdateLeasePlot = () => {

    const id = useParams();

    const navigate = useNavigate();

    const renterNameRef = useRef();
    const plotNameRef = useRef();
    const periodRef = useRef();
    const amountRef = useRef();

    const [plotNames, setPlotNames] = useState([]);
    const [singleLeasePlot, setSinglePlotDetails] = useState([]);

    useEffect(() => {
        const allPlotsName = async () => {
            const res = await getAllPlotsName();
            if (res.status === 200) {
                const data = res.data;
                setPlotNames(data);
            }
            else {
                alert(res.data);
            }
        }
        allPlotsName();
    }, []);

    useEffect(() => {
        const findPlot = async () => {
            const res = await singleLeasedPlot(id.id);
            if (res.status === 200) {
                setSinglePlotDetails(res.data);
            }
            else {
                toast.error(res.data, {
                    position: "top-right"
                });
            }
        }
        findPlot();
    }, []);
    
    const submit = async (e) => {
        e.preventDefault();
        const options = plotNameRef.current.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }

        const leaseInfo = {
            plots: selectedValues,
            renter: renterNameRef.current.value,
            period: periodRef.current.value,
            amount: amountRef.current.value
        };

        if (leaseInfo.plots.length === 0) {
            alert("Please Select Plot !");
        }
        else if (leaseInfo.renter.trim() === "") {
            alert("Please Enter Renter Name !");
        }
        else if (leaseInfo.period < 1) {
            alert(`Period cannot be ${leaseInfo.period} !`);
        }
        else if (leaseInfo.amount < 1) {
            alert(`Amount cannot be ${leaseInfo.amount} !`);
        }
        else {
            const res = await updateLeasePlot(id.id,leaseInfo);
            if (res.data === 200) {
                toast.success(res.data, {
                    position: "top-right"
                });
                navigate("/leased-plots");
            }
            else {
                toast.success(res.data, {
                    position: "top-right"
                });
                navigate("/leased-plots");
            }
        }
    }

    return (
        <div className="w-full flex flex-col px-2">
            <Link
                to="/leased-plots"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black"
            >
                <MdKeyboardBackspace
                    className="w-6 h-6"
                />
            </Link>

            <div
                className='w-full flex flex-col items-center justify-center gap-6 bg-black rounded-md z-20 pt-2 pb-4 mt-5'
            >
                <h1
                    className="text-2xl font-semibold"
                >
                    Update Plot
                </h1>

                <form
                    onSubmit={submit}
                    className="flex flex-col gap-1"
                >
                    <select
                        ref={plotNameRef}
                        id="plot-name"
                        required
                        multiple
                        className="w-60 text-lg bg-[#242424] rounded-md py-1 px-2 outline-none"
                    >
                        {plotNames.map((d) =>
                            <option key={d._id} value={d.plotname}>
                                {d.plotname}
                            </option>
                        )}
                    </select>

                    <FormFields
                        reference={renterNameRef}
                        hf="renter-name"
                        labelText="Renter Name"
                        type="text"
                        ph="e.g. Shyam Singh"
                        df={singleLeasePlot?.renter}
                    />
                    <FormFields
                        reference={periodRef}
                        hf="period"
                        labelText="Period (in Months)"
                        type="number"
                        ph="e.g. 12"
                        df={singleLeasePlot?.period}
                    />
                    <FormFields
                        reference={amountRef}
                        hf="amount"
                        labelText="Amount (in K)"
                        type="number"
                        ph="e.g. 15"
                        df={singleLeasePlot?.amount}
                    />

                    <button
                        type="submit"
                        className="w-28 text-lg self-center font-semibold rounded-md py-1 bg-green-600 mt-4 hover:bg-green-700"
                    >
                        Update Plot
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateLeasePlot;