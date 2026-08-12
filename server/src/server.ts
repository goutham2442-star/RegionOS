import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import calendarRoutes from "./routes/calendarRoutes.js";
import { getDatabase } from "./db/database.js";
import { startScheduler } from "./scheduler/meetingReminderScheduler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for development
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Expose Calendar APIs
app.use("/api/calendar", calendarRoutes);

async function bootstrap() {
  try {
    // Initialize DB & seed demo records
    await getDatabase();
    console.log("[SERVER] Database initialized and connected.");

    // Start server listener
    app.listen(port, () => {
      console.log(`[SERVER] Calendar Backend listening on port ${port}`);
    });

    // Start checking upcoming meetings reminders
    startScheduler();
  } catch (error) {
    console.error("[SERVER] Failed to bootstrap calendar backend:", error);
    process.exit(1);
  }
}

bootstrap();
