import dotenv from "dotenv";

dotenv.config();

export const env = {
    corsOrigin: process.env.CORS_ORIGIN?.trim() || "*",
    dbUrl: process.env.DB_URL?.trim() || "",
    nodeEnv: process.env.NODE_ENV?.trim() || "development",
    port: Number(process.env.PORT || 3000)
};
