import mongoose, { connections } from "mongoose";

type connection = {
    isConnected?: number
}

const connection: connection = {}

export const DB_Connect = async (): Promise<void> => {

    const MONGODB_URI = process.env.DATABASE_URL;

    if (connection.isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }


    try {
        if (!MONGODB_URI) {
            throw new Error("Please provide a valid MongoDB URI");
        }
        const db = await mongoose.connect(MONGODB_URI)
        connection.isConnected = db.connections[0].readyState

        console.log("Database connected successfully!");


    } catch (error) {
        console.log("Database connection failed!", error)

        process.exit(1)
    }

}
