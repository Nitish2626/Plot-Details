import mongoose,{Schema} from "mongoose";

const leasedPlotsSchema = mongoose.Schema({
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
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:"user"
    }
},
    {
        timestamps: true
    }
);

export const leasedPlotsModels = mongoose.model("leased-plots", leasedPlotsSchema);