import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getDatabaseMode } from "./config/database.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import cartRoutes from "./routes/cartRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const apiPrefixes = ["/menu", "/cart", "/order", "/health", "/admin"];

function resolveCorsOrigin() {
    if (!env.corsOrigin || env.corsOrigin === "*") {
        return true;
    }

    return env.corsOrigin.split(",").map((origin) => origin.trim());
}

app.use(cors({ origin: resolveCorsOrigin() }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.get("/health", (request, response) => {
    response.status(200).json({
        success: true,
        message: "CollMenu API is healthy.",
        data: {
            databaseMode: getDatabaseMode(),
            status: "ok"
        }
    });
});

app.use(express.static(__dirname));
app.use("/menu", menuRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/admin", adminRoutes);

app.get("*", (request, response, next) => {
    const isApiRequest = apiPrefixes.some((prefix) => request.path === prefix || request.path.startsWith(`${prefix}/`));
    const isAssetRequest = Boolean(path.extname(request.path));

    if (isApiRequest || isAssetRequest) {
        next();
        return;
    }

    response.sendFile(path.join(__dirname, "index.html"));
});

app.use(notFound);
app.use(errorHandler);

export default app;
