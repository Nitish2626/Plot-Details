import express from "express";
import { dbConnection } from "./db/dbConnection.js";
import { plotsRouter } from "./routes/plotsRouter.js";
import { leasedPlotsRouter } from "./routes/leasedPlotsRouter.js";
import { userRouter } from "./routes/userRouter.js";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();
const port=process.env.PORT || 200;

app.use(express.json());
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
 
app.use("/plots",plotsRouter);
app.use("/leased-plots",leasedPlotsRouter);
app.use("/user",userRouter);

app.listen(port,()=>{
    dbConnection();
    console.log("Server Started at port",port);
});