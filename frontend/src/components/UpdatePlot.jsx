import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import FormFields from "./FormFields";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getSinglePlot, updatePlot } from '../helpers/plotsApiCommunicator';

const UpdatePlot = () => {

    const id = useParams();

    const navigate = useNavigate();

    const khataNo = useRef();
    const plotNo = useRef();
    const plotName = useRef();
    const dismil = useRef();
    const area = useRef();
    const [singlePlotDetails, setSinglePlotDetails] = useState();

    useEffect(() => {
        const findPlot = async () => {
            const res = await getSinglePlot(id.id);
            if (res.status === 200) {
                setSinglePlotDetails(res.data);
            }
            else {
                toast.error(res.data, {
                    position: "top-right"
                });
            }
        };
        findPlot();
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        const info = {
            khatano: khataNo?.current.value,
            plotno: plotNo?.current.value,
            plotname: plotName?.current.value,
            dismil: dismil?.current.value,
            area: area?.current.value
        };

        if (info.khatano.trim() === "") {
            toast.error("Khata No. Cannot Be Blank !", {
                position: "top-right"
            });
        }
        else if (info.plotno < 1) {
            toast.error("Plot No. Cannot Be Blank !", {
                position: "top-right"
            });
        }
        else if (info.plotname.trim() === "") {
            toast.error("Plot Name Cannot Be Blank !", {
                position: "top-right"
            });
        }
        else if (info.dismil < 1) {
            toast.error(`Dismil Cannot Be ${info.dismil} !`, {
                position: "top-right"
            });
        }
        else if (info.area < 1) {
            toast.error(`Plot Area Cannot Be ${info.area} !`, {
                position: "top-right"
            });
        }
        else {
            const res = await updatePlot(id.id, info);
            if (res.status === 201) {
                toast.success(res.data, {
                    position: "top-right"
                });
                navigate("/all-plots");
            }
            else {
                toast.error(res.data, {
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
                    Update Plot
                </h1>

                <form
                    onSubmit={submit}
                    className="flex flex-col gap-1"
                >
                    <FormFields
                        reference={khataNo}
                        hf="khata-no"
                        labelText="Khata No."
                        type="text"
                        ph="e.g. 123"
                        df={singlePlotDetails?.khatano}
                    />
                    <FormFields
                        reference={plotNo}
                        hf="plot-no"
                        labelText="Plot No."
                        type="text"
                        ph="e.g. 456"
                        df={singlePlotDetails?.plotno}
                    />
                    <FormFields
                        reference={plotName}
                        hf="plot-name"
                        labelText="Plot Name"
                        type="text"
                        ph="e.g. Bahuahri"
                        df={singlePlotDetails?.plotname}
                    />
                    <FormFields
                        reference={dismil}
                        hf="dismil"
                        labelText="Dismil"
                        type="text"
                        ph="e.g. 10"
                        df={singlePlotDetails?.dismil}
                    />
                    <FormFields
                        reference={area}
                        hf="area"
                        labelText="Area (in Kattha)"
                        type="number"
                        ph="e.g. 20"
                        df={singlePlotDetails?.area}
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

export default UpdatePlot;