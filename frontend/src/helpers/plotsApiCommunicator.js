import axios from "axios";

export const getAllPlotsName = async () => {
    try {
        const res = await axios.get("http://localhost:200/plots/all-plots-name", { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Get All Plots Name API Communicator", error);
    }
}

export const getSinglePlot = async (id) => {
    try {
        const res = await axios.get(`http://localhost:200/plots/single/${id}`, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Get Single Plot API Communicator", error);
    }
};

export const getAllPlots = async () => {
    try {
        const res = await axios.get("http://localhost:200/plots", { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Get All Plots API Communicator", error);
    }
};

export const addNewPlot = async (plotInfo) => {
    try {
        const res = await axios.post("http://localhost:200/plots/add-plot", await plotInfo, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Add New Plots API Communicator", error);
    }
};

export const updatePlot = async (id, info) => {
    try {
        const res = await axios.put(`http://localhost:200/plots/update/${id}`, info, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Update Plots API Communicator", error);
    }
};

export const deletePlot = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:200/plots/delete/${id}`, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Delete Plot API Communicator", error);
    }
};

export const searchPlot = async (data) => {
    try {
        const res = await axios.get(`http://localhost:200/plots/search?search=${data}`, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Search Lease Plot API Communicator", error);
    }
};

export const sortPlot = async (data) => {
    try {
        const res = await axios.get(`http://localhost:200/plots/sort?sort=${data}`, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Sort Lease Plot API Communicator", error);
    }
};