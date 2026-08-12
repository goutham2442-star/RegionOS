import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbInstance: Database | null = null;

export async function getDatabase(): Promise<Database> {
  if (dbInstance) {
    return dbInstance;
  }

  const dbPath = process.env.DATABASE_PATH || path.join(__dirname, "../../../calendar.db");

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // Setup tables migration
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      startTime TEXT NOT NULL,
      endTime TEXT NOT NULL,
      location TEXT,
      reminderMinutes INTEGER DEFAULT 10,
      reminderSent INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      timeInfo TEXT,
      unread INTEGER DEFAULT 1,
      createdAt TEXT NOT NULL
    );
  `);

  // Seed demo meetings if the table is empty
  const countResult = await dbInstance.get("SELECT COUNT(*) as count FROM events");
  if (countResult && countResult.count === 0) {
    const now = new Date().toISOString();
    const demoMeetings = [
      {
        title: "Regional Operations Review",
        description: "Standard regional operations review and initiatives tracking.",
        date: "2026-08-13",
        startTime: "10:30",
        endTime: "11:30",
        location: "Regional Conference Room",
        reminderMinutes: 10,
      },
      {
        title: "Campus Performance Meeting",
        description: "Detailed campus consolidation status and faculty checks.",
        date: "2026-08-14",
        startTime: "14:00",
        endTime: "15:00",
        location: "Virtual Meeting",
        reminderMinutes: 10,
      },
      {
        title: "Placement Review",
        description: "Analyzing eligibility limits and recruiter allocations.",
        date: "2026-08-17",
        startTime: "11:00",
        endTime: "12:00",
        location: "RGU Board Room",
        reminderMinutes: 10,
      },
      {
        title: "Faculty Coordination Meeting",
        description: "Syllabus mapping and general dean alignments.",
        date: "2026-08-18",
        startTime: "15:30",
        endTime: "16:30",
        location: "Academic Council Room",
        reminderMinutes: 10,
      },
    ];

    for (const m of demoMeetings) {
      await dbInstance.run(
        `INSERT INTO events (title, description, date, startTime, endTime, location, reminderMinutes, reminderSent, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?)`,
        [m.title, m.description, m.date, m.startTime, m.endTime, m.location, m.reminderMinutes, now, now]
      );
    }
    console.log("Database seeded with demo meetings successfully.");
  }

  return dbInstance;
}
