import { Router } from "express";
import { addNewLeasePlot, deleteLeasePlot, getAllLeasePlot, getSingleLeasePlot, searchLeasePlot, sortLeasePlot, updateLeasePlot } from "../controllers/leasedPlotsController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const leasedPlotsRouter = Router();

leasedPlotsRouter.get("/single/:id", verifyToken, getSingleLeasePlot);
leasedPlotsRouter.get("/", verifyToken, getAllLeasePlot);
leasedPlotsRouter.post("/add-lease-plot", verifyToken, addNewLeasePlot);
leasedPlotsRouter.put("/update-lease-plot/:id", verifyToken, updateLeasePlot);
leasedPlotsRouter.delete("/delete-lease-plot/:id", verifyToken, deleteLeasePlot);
leasedPlotsRouter.get("/search", verifyToken, searchLeasePlot);
leasedPlotsRouter.get("/sort", verifyToken, sortLeasePlot);