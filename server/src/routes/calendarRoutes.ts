import { Router, Request, Response } from "express";
import { getDatabase } from "../db/database.js";

const router = Router();

// Validation helper
function validateEvent(body: any) {
  const { title, date, startTime, endTime, reminderMinutes } = body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return "title is required";
  }
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return "date is required in YYYY-MM-DD format";
  }
  if (!startTime || !/^\d{2}:\d{2}$/.test(startTime)) {
    return "startTime is required in HH:MM format";
  }
  if (!endTime || !/^\d{2}:\d{2}$/.test(endTime)) {
    return "endTime is required in HH:MM format";
  }

  // End time must be after start time
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);
  const startVal = startH * 60 + startM;
  const endVal = endH * 60 + endM;

  if (endVal <= startVal) {
    return "end time must be after start time";
  }

  if (reminderMinutes !== undefined) {
    const min = Number(reminderMinutes);
    if (isNaN(min) || min < 0) {
      return "reminderMinutes must be a valid non-negative number";
    }
  }

  return null;
}

// GET all events
router.get("/events", async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const rows = await db.all("SELECT * FROM events ORDER BY date ASC, startTime ASC");
    res.json({ success: true, data: rows });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
});

// GET one event
router.get("/events/:id", async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const row = await db.get("SELECT * FROM events WHERE id = ?", [req.params.id]);
    if (!row) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }
    res.json({ success: true, data: row });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
});

// POST create event
router.post("/events", async (req: Request, res: Response) => {
  try {
    const validationError = validateEvent(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const { title, description, date, startTime, endTime, location, reminderMinutes } = req.body;
    const db = await getDatabase();
    const now = new Date().toISOString();
    const minutes = reminderMinutes !== undefined ? Number(reminderMinutes) : 10;

    const result = await db.run(
      `INSERT INTO events (title, description, date, startTime, endTime, location, reminderMinutes, reminderSent, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?)`,
      [title, description || "", date, startTime, endTime, location || "", minutes, now, now]
    );

    const newRow = await db.get("SELECT * FROM events WHERE id = ?", [result.lastID]);
    res.status(201).json({ success: true, data: newRow });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
});

// PUT update event
router.put("/events/:id", async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const existing = await db.get("SELECT * FROM events WHERE id = ?", [req.params.id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }

    const validationError = validateEvent(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const { title, description, date, startTime, endTime, location, reminderMinutes } = req.body;
    const now = new Date().toISOString();
    const minutes = reminderMinutes !== undefined ? Number(reminderMinutes) : 10;

    // Reset reminderSent if date or start time changes
    const timeChanged = existing.date !== date || existing.startTime !== startTime || existing.reminderMinutes !== minutes;
    const reminderSent = timeChanged ? 0 : existing.reminderSent;

    await db.run(
      `UPDATE events
       SET title = ?, description = ?, date = ?, startTime = ?, endTime = ?, location = ?, reminderMinutes = ?, reminderSent = ?, updatedAt = ?
       WHERE id = ?`,
      [title, description || "", date, startTime, endTime, location || "", minutes, reminderSent, now, req.params.id]
    );

    const updatedRow = await db.get("SELECT * FROM events WHERE id = ?", [req.params.id]);
    res.json({ success: true, data: updatedRow });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
});

// DELETE event
router.delete("/events/:id", async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const existing = await db.get("SELECT * FROM events WHERE id = ?", [req.params.id]);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }

    await db.run("DELETE FROM events WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Meeting deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
});

// GET all notifications
router.get("/notifications", async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const rows = await db.all("SELECT * FROM notifications ORDER BY createdAt DESC LIMIT 50");
    res.json({ success: true, data: rows });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
});

// POST mark all notifications as read
router.post("/notifications/mark-read", async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    await db.run("UPDATE notifications SET unread = 0");
    res.json({ success: true, message: "Notifications marked as read" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
});

// POST force trigger reminder for testing
router.post("/events/:id/trigger-reminder", async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const event = await db.get("SELECT * FROM events WHERE id = ?", [req.params.id]);
    if (!event) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }

    const notificationTitle = "Upcoming Meeting";
    const notificationBody = `[TEST] ${event.title} starts in 10 minutes.`;
    
    const [h, m] = event.startTime.split(":");
    const ampm = Number(h) >= 12 ? "PM" : "AM";
    const formattedHour = Number(h) % 12 || 12;
    const timeInfo = `${formattedHour}:${m} ${ampm} • ${event.location || "Virtual"}`;

    const now = new Date();
    await db.run(
      `INSERT INTO notifications (title, body, timeInfo, unread, createdAt)
       VALUES (?, ?, ?, 1, ?)`,
      [notificationTitle, notificationBody, timeInfo, now.toISOString()]
    );

    await db.run("UPDATE events SET reminderSent = 1 WHERE id = ?", [event.id]);

    res.json({ success: true, message: "Test reminder triggered successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
});

export default router;
