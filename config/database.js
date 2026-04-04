import mongoose from "mongoose";
import { env } from "./env.js";

let activeDatabaseMode = env.dbUrl ? "mongodb" : "local";

export async function connectDatabase() {
    if (!env.dbUrl) {
        console.log("DB_URL not set. Falling back to local JSON storage.");
        activeDatabaseMode = "local";
        return;
    }

    try {
        await mongoose.connect(env.dbUrl, {
            serverSelectionTimeoutMS: 5000
        });

        activeDatabaseMode = "mongodb";
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.log("MongoDB connection failed. Falling back to local JSON storage.");
        console.log(error.message);
        activeDatabaseMode = "local";
    }
}

export function isMongoEnabled() {
    return activeDatabaseMode === "mongodb" && mongoose.connection.readyState === 1;
}

export function getDatabaseMode() {
    return activeDatabaseMode;
}
