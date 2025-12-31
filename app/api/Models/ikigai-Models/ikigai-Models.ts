import mongoose, { Schema, Document } from "mongoose";

export interface Ikigai extends Document {
    title: string;
    description: string;
    tags: string[];
}

// ikigai schemas 
const ikigaiSchema = new Schema<Ikigai>({
    // ikigai properties

}, {
    timestamps: true,
});

// ikigai model
const Ikigai_Model = mongoose.model<Ikigai>("Ikigai", ikigaiSchema);

export default Ikigai_Model;
