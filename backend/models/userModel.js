import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    plots: [{
        plotname: {
            type: String
        },
        area: {
            type: Number
        }
    }],
    leasedPlots: [{
        plots: {
            type: [] 
        },
        renter: {
            type: String
        },
        period: {
            type: Number
        },
        amount: {
            type: Number
        }
    }]
},
    {
        timestamps: true
    }
);

export const userModel = mongoose.model("user", userSchema);