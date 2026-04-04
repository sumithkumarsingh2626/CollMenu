import app from "./app.js";
import { connectDatabase, getDatabaseMode } from "./config/database.js";
import { env } from "./config/env.js";
import { initializeDataStore } from "./services/dataStore.js";

async function startServer() {
    await connectDatabase();
    await initializeDataStore();

    app.listen(env.port, () => {
        console.log(`CollMenu backend running at http://127.0.0.1:${env.port}`);
        console.log(`Storage mode: ${getDatabaseMode()}`);
    });
}

startServer().catch((error) => {
    console.error("Failed to start CollMenu backend:", error);
    process.exit(1);
});
