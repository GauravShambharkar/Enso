import mongoose, { Schema, Document } from "mongoose";

type decisionMatric = {
    urgent: string,
    non_urgent: string,
    important: string,
    non_important: string,
}

export interface Eisen_Matrix extends Document {
    eisen_matrix: decisionMatric[],
}

// Eisen Matrix schemas 
const eisenMatrixSchema = new Schema<Eisen_Matrix>({
    eisen_matrix: [{
        urgent: {
            type: String,
            required: true,
        },
        non_urgent: {
            type: String,
            required: true,
        },
        important: {
            type: String,
            required: true,
        },
        non_important: {
            type: String,
            required: true,
        },
    }]
}, {
    timestamps: true,
});

// Eisen matrix model
const Eisen_Matrix_Model = mongoose.model<Eisen_Matrix>("Eisen_Matrix", eisenMatrixSchema);

export default Eisen_Matrix_Model;
