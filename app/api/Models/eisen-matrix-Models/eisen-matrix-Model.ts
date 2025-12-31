import mongoose, { Schema, Document } from "mongoose";

export interface Eisen_Matrix extends Document {
    urgent: string;
    non_urgent: string;
    important: string;
    non_important: string;
}

// Eisen Matrix schemas 
const eisenMatrixSchema = new Schema<Eisen_Matrix>({
    // Eisen Matrix properties
    // urgent
    urgent: {
        type: String,
        required: true,
    },
    // not-urgent
    non_urgent: {
        type: String,
        required: true,
    },
    // important
    important: {
        type: String,
        required: true,
    },
    // not-important
    non_important: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

// Eisen matrix model
const Eisen_Matrix_Model = mongoose.model<Eisen_Matrix>("Eisen_Matrix", eisenMatrixSchema);

export default Eisen_Matrix_Model;
