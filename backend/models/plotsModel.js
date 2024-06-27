import mongoose,{Schema} from "mongoose";

const plotsSchema = mongoose.Schema({
    khatano: {
        type: String
    },
    plotno:{
        type:Number
    },
    plotname: {
        type: String
    },
    dismil:{
        type:Number
    },
    area: {
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

export const plotsModel = mongoose.model("plots", plotsSchema);