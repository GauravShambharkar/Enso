import mongoose, { Schema, Document } from "mongoose";

export interface IdeaVault extends Document {
    title: string;
    description: string;
    tags: string[];
}

// idea-vault schemas 
const ideaVaultSchema = new Schema<IdeaVault>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// idea-vault model
const Idea_Vault_Model = mongoose.model<IdeaVault>("IdeaVault", ideaVaultSchema);

export default Idea_Vault_Model;
