import axios from "axios";

export const singleLeasedPlot = async (id) => {
    try {
        const res = await axios.get(`http://localhost:200/leased-plots/single/${id}`, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Single Leased Plot API Communicator", error);
    }
};

export const getAllLeasedPlots = async () => {
    try {
        const res = await axios.get("http://localhost:200/leased-plots", { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("All Leased Plots API Communicator", error);
    }
};

export const addLeasePlot = async (info) => {
    try {
        const res = await axios.post("http://localhost:200/leased-plots/add-lease-plot", info, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Add Lease Plot API Communicator", error);
    }
};

export const updateLeasePlot = async (id, info) => {
    try {
        const res = await axios.put(`http://localhost:200/leased-plots/update-lease-plot/${id}`, info, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Update Lease Plot API Communicator", error);
    }
};

export const deleteLeasePlot = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:200/leased-plots/delete-lease-plot/${id}`, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Delete Lease Plot API Communicator", error);
    }
};

export const searchLeasePlot = async (data) => {
    try {
        const res = await axios.get(`http://localhost:200/leased-plots/search?search=${data}`, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Search Lease Plot API Communicator", error);
    }
};

export const sortLeasePlot = async (data) => {
    try {
        const res = await axios.get(`http://localhost:200/leased-plots/sort?sort=${data}`, { withCredentials: true });
        return res;
    }
    catch (error) {
        console.log("Sort Lease Plot API Communicator", error);
    }
};