import app from "./app.js";
import { connectDatabase, getDatabaseMode } from "./config/database.js";
import { env } from "./config/env.js";
import { initializeDataStore } from "./services/dataStore.js";

async function startServer() {
    await connectDatabase();
    await initializeDataStore();

app.listen(env.port || 5000, () => {
        console.log(`Baba Canteen Backend API at http://localhost:${env.port || 5000}`);
        console.log(`Storage: ${getDatabaseMode()} | Admin login: POST /admin/login`);
    });
}

startServer().catch((error) => {
    console.error("Failed to start CollMenu backend:", error);
    process.exit(1);
});
