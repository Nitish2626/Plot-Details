import { leasedPlotsModels } from "../models/leasedPlotsModel.js";

export const getSingleLeasePlot = (async (req, res) => {
    try {
        const singleLeasePlot = await leasedPlotsModels.findById(req.params.id);
        res.status(200).send(singleLeasePlot);
    }
    catch (error) {
        console.log("Get Single Lease Plot API", error);
        res.status(400).send("Unable To Find Single Lease Plot");
    }
});

export const getAllLeasePlot = (async (req, res) => {
    try {
        const allLeasePlot = await leasedPlotsModels.find({owner:res.locals.jwtData.id});
        res.status(200).send(allLeasePlot);
    }
    catch (error) {
        console.log("Get All Lease Plot API", error);
        res.status(400).send("Unable To Find All Lease Plot");
    }
});

export const addNewLeasePlot = (async (req, res) => {
    try {
        const { plots, renter, period, amount } = req.body;
        await leasedPlotsModels.create({ plots, renter, period, amount, owner: res.locals.jwtData.id });
        res.status(200).send("New Lease Plot Added Successfully");
    }
    catch (error) {
        console.log("Add New Lease Plot API", error);
        res.status(400).send("Unable To Add New Lease Plot");
    }
});

export const updateLeasePlot = (async (req, res) => {
    try {
        await leasedPlotsModels.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).send("Leased Plot Updated Successfully");
    }
    catch (error) {
        console.log("Update Leased Plot API", error);
        res.status(400).send("Unable To Update Leased Plot");
    }
});

export const deleteLeasePlot = (async (req, res) => {
    try {
        await leasedPlotsModels.findByIdAndDelete(req.params.id);
        res.status(200).send("Lease Plot Deleted Successfully");
    }
    catch (error) {
        console.log("Delete Lease Plot API", error);
        res.status(400).send("Unable To Delete Leased Plot");
    }
});

export const searchLeasePlot = (async (req, res) => {
    try {
        const q = req.query.search;
        const searchedData = await leasedPlotsModels.find({
            $or: [
                { plots: new RegExp(q, 'i') },
                { renter: new RegExp(q, 'i') }
            ]
        });
        res.status(200).send(searchedData);
    }
    catch (error) {
        console.log("Search Lease Plot API", error);
        res.status(400).send("Unable to Search Leased Plots");
    }
});

export const sortLeasePlot = (async (req, res) => {
    try {
        const { sort } = req.query;
        if (sort === "nf") {
            const sortedData = await leasedPlotsModels.find().sort({ updatedAt: -1 });
            res.status(200).send(sortedData);
        }
        else if (sort === "of") {
            const sortedData = await leasedPlotsModels.find().sort({ updatedAt: 1 });
            res.status(200).send(sortedData);
        }
        else if (sort === "alth") {
            const sortedData = await leasedPlotsModels.find().sort({ amount: 1 });
            res.status(200).send(sortedData);
        }
        else if (sort === "ahtl") {
            const sortedData = await leasedPlotsModels.find().sort({ amount: -1 });
            res.status(200).send(sortedData);
        }
        else if (sort === "plth") {
            const sortedData = await leasedPlotsModels.find().sort({ period: 1 });
            res.status(200).send(sortedData);
        }
        else {
            const sortedData = await leasedPlotsModels.find().sort({ period: -1 });
            res.status(200).send(sortedData);
        }
    }
    catch (error) {
        console.log("Sort Lease Plot API", error);
        res.status(400).send("Unable To Sort Plot");
    }
});