import mongoose, { Schema, Document } from "mongoose";

type ideaVault = {
    title: string,
    description: string,
}

export interface IdeaVault extends Document {
    ideaVault: ideaVault[],
}
// idea-vault schemas 
const ideaVaultSchema = new Schema<IdeaVault>(
    {
        ideaVault: [{
            title: {
                type: String,
                required: true,
                trim: true,
            },
            description: {
                type: String,
                required: true,
            },
        }]
    },
    {
        timestamps: true,
    }
);

// idea-vault model
const Idea_Vault_Model = mongoose.model<IdeaVault>("IdeaVault", ideaVaultSchema);

export default Idea_Vault_Model;
