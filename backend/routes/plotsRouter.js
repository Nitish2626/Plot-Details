import { Router } from "express";
import { addNewPlot, deletePlot, getAllPlots, getAllPlotsName, getSinglePlot, searchPlot, sortPlot, updatePlot } from "../controllers/plotsController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const plotsRouter = Router();

plotsRouter.get("/all-plots-name", verifyToken, getAllPlotsName);
plotsRouter.get("/single/:id", verifyToken, getSinglePlot);
plotsRouter.get("/", verifyToken, getAllPlots);
plotsRouter.post("/add-plot", verifyToken, addNewPlot);
plotsRouter.put("/update/:id", verifyToken, updatePlot);
plotsRouter.delete("/delete/:id", verifyToken, deletePlot);
plotsRouter.get("/search", verifyToken, searchPlot);
plotsRouter.get("/sort", verifyToken, sortPlot);