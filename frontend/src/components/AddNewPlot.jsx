import { MdKeyboardBackspace } from "react-icons/md";
import FormFields from "./FormFields.jsx";
import { useRef } from "react";
import { addNewPlot } from "../helpers/plotsApiCommunicator.js";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const AddNewPlot = () => {

    const navigate = useNavigate();

    const khataNo = useRef();
    const plotNo = useRef();
    const plotName = useRef();
    const dismil = useRef();
    const area = useRef();

    const submit = async (e) => {
        e.preventDefault();
        const plotInfo = {
            khatano: khataNo.current.value,
            plotno: plotNo.current.value,
            plotname: plotName.current.value.toLowerCase(),
            dismil: dismil.current.value,
            area: area.current.value
        };
 
        if (plotInfo.khatano.trim() === "") {
            toast.error("Khata No. Cannot Be Blank !", {
                position: "top-right"
            });
        }
        else if (plotInfo.plotname.trim() === "") {
            toast.error("Plot Name Cannot Be Blank !", {
                position: "top-right"
            });
        }
        else if (plotInfo.plotno < 1) {
            toast.error(`Plot No. Cannot Be ${plotInfo.plotno} !`, {
                position: "top-right"
            });
        }
        else if (plotInfo.dismil < 1) {
            toast.error(`Dismil Cannot Be ${plotInfo.dismil} !`, {
                position: "top-right"
            });
        }
        else if (plotInfo.area < 1) {
            toast.error(`Plot Area Cannot Be ${plotInfo.area} !`, {
                position: "top-right"
            });
        }
        else {
            const res = await addNewPlot(plotInfo);
            if (res.status === 200) {
                toast.success(res.data, {
                    position: "top-right"
                });
                navigate("/all-plots");
            }
            else {
                toast.success(res.data, {
                    position: "top-right"
                });
                navigate("/all-plots");
            }
        }
    };

    return (
        <div className="w-full flex flex-col px-2">
            <Link
                to="/all-plots"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black"
            >
                <MdKeyboardBackspace
                    className="w-6 h-6"
                />
            </Link>

            <div
                className='w-full flex flex-col items-center justify-center gap-6 bg-black rounded-md z-20 pt-2 pb-4 mt-2 mb-10'
            >
                <h1
                    className="text-2xl font-semibold"
                >
                    Add New Plot
                </h1>

                <form
                    onSubmit={submit}
                    className="flex flex-col gap-4"
                >
                    <FormFields
                        reference={khataNo}
                        hf="khata-no"
                        labelText="Khata No."
                        type="text"
                        ph="e.g. 123"
                    />
                    <FormFields
                        reference={plotNo}
                        hf="plot-no"
                        labelText="Plot No."
                        type="text"
                        ph="e.g. 456"
                    />
                    <FormFields
                        reference={plotName}
                        hf="plot-name"
                        labelText="Plot Name"
                        type="text"
                        ph="e.g. Bahuahri"
                    />
                    <FormFields
                        reference={dismil}
                        hf="dusmil"
                        labelText="Dismil"
                        type="text"
                        ph="e.g. 10"
                    />
                    <FormFields
                        reference={area}
                        hf="area"
                        labelText="Area (in Kattha)"
                        type="number"
                        ph="e.g. 20"
                    />

                    <button
                        type="submit"
                        className="w-28 text-lg self-center font-semibold rounded-md py-1 bg-blue-600 mt-4 hover:bg-blue-700"
                    >
                        Add Plot
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNewPlot;