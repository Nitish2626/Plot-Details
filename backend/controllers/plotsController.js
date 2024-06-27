import { plotsModel } from "../models/plotsModel.js";

export const getAllPlotsName = (async (req, res) => {
    try {
        const plotNames = await plotsModel.find({ owner: res.locals.jwtData.id }, { plotname: 1 });
        res.status(200).send(plotNames);
    }
    catch (error) {
        console.log("Get All Plots Name API", error);
        res.status(400).send("Unable To Find All Plots Name")
    }
});

export const getSinglePlot = (async (req, res) => {
    try {
        const singlePlot = await plotsModel.findById(req.params.id);
        res.status(200).send(singlePlot);
    }
    catch (error) {
        console.log("Get Single Plot API ERROR", error);
        res.status(400).send("Unable to Find Plots");
    }
});

export const getAllPlots = (async (req, res) => {
    try {
        const allPlots = await plotsModel.find({ owner: res.locals.jwtData.id });
        res.status(200).send(allPlots);
    }
    catch (error) {
        console.log("Get All Plots API", error);
        res.status(400).send("Unable to Find Plots");
    }
});

export const addNewPlot = (async (req, res) => {
    try {
        const { khatano, plotno, plotname, dismil, area } = req.body;
        await plotsModel.create({ khatano, plotno, plotname, dismil, area, owner: res.locals.jwtData.id });
        res.status(200).send("New Plot Added Successfully");
    }
    catch (error) {
        console.log("Add New Plot API ERROR", error);
        res.status(400).send("Unable to Add Plot");
    }
});

export const updatePlot = (async (req, res) => {
    try {
        await plotsModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).send("Plot Updated Successfully");
    }
    catch (error) {
        console.log("Update Plot API ERROR", error);
        res.status(400).send("Unable to Update Plot");
    }
});

export const deletePlot = (async (req, res) => {
    try {
        await plotsModel.findByIdAndDelete(req.params.id);
        res.status(200).send("Plot Deleted Successfully");
    }
    catch (error) {
        console.log("Delete Plot API ERROR", error);
        res.status(400).send("Unable to Delete Plot");
    }
});

export const searchPlot = (async (req, res) => {
    try {
        const q = req.query.search;
        const searchedData = await plotsModel.find({
            $or: [
                { plotname: new RegExp(q, 'i') },
                { khatano: new RegExp(q, 'i') }
            ]
        });
        res.status(200).send(searchedData);
    }
    catch (error) {
        console.log("Search Lease Plot API", error);
        res.status(400).send("Unable to Search Leased Plots");
    }
});

export const sortPlot = (async (req, res) => {
    try {
        const { sort } = req.query;
        if (sort === "nf") {
            const sortedData = await plotsModel.find().sort({ updatedAt: -1 });
            res.status(200).send(sortedData);
        }
        else if (sort === "of") {
            const sortedData = await plotsModel.find().sort({ updatedAt: 1 });
            res.status(200).send(sortedData);
        }
        else if (sort === "plth") {
            const sortedData = await plotsModel.find().sort({ plotno: 1 });
            res.status(200).send(sortedData);
        }
        else if (sort === "phtl") {
            const sortedData = await plotsModel.find().sort({ plotno: -1 });
            res.status(200).send(sortedData);
        }
        else if (sort === "dlth") {
            const sortedData = await plotsModel.find().sort({ dismil: 1 });
            res.status(200).send(sortedData);
        }
        else if (sort === "dhtl") {
            const sortedData = await plotsModel.find().sort({ dismil: -1 });
            res.status(200).send(sortedData);
        }
        else if (sort === "alth") {
            const sortedData = await plotsModel.find().sort({ area: 1 });
            res.status(200).send(sortedData);
        }
        else if (sort === "ahtl") {
            const sortedData = await plotsModel.find().sort({ area: -1 });
            res.status(200).send(sortedData);
        }
    }
    catch (error) {
        console.log("Sort Lease Plot API", error);
        res.status(400).send("Unable To Sort Plot");
    }
});