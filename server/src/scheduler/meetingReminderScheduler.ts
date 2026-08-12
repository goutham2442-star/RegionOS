import { getDatabase } from "../db/database.js";

export function startScheduler() {
  // Run once per minute (60000ms)
  setInterval(async () => {
    try {
      const db = await getDatabase();
      const now = new Date();
      const nowMs = now.getTime();

      // Query events that haven't had their reminder sent
      const pendingEvents = await db.all("SELECT * FROM events WHERE reminderSent = 0");

      for (const event of pendingEvents) {
        // Parse date and times in local system timezone
        const meetingStartStr = `${event.date}T${event.startTime}:00`;
        const meetingEndStr = `${event.date}T${event.endTime}:00`;
        
        const meetingStart = new Date(meetingStartStr);
        const meetingEnd = new Date(meetingEndStr);

        const startMs = meetingStart.getTime();
        const endMs = meetingEnd.getTime();

        // Calculate reminder trigger time
        const reminderMinutes = event.reminderMinutes !== null ? event.reminderMinutes : 10;
        const reminderTimeMs = startMs - (reminderMinutes * 60 * 1000);

        // Conditions to trigger:
        // 1. Current time has reached or passed the reminder time.
        // 2. The meeting has not started yet.
        if (nowMs >= reminderTimeMs && nowMs < startMs) {
          // Calculate active remaining minutes
          const diffMinutes = Math.max(1, Math.round((startMs - nowMs) / (60 * 1000)));
          const notificationTitle = "Upcoming Meeting";
          const notificationBody = `${event.title} starts in ${diffMinutes} minutes.`;
          
          // Formatted time info
          const [h, m] = event.startTime.split(":");
          const ampm = Number(h) >= 12 ? "PM" : "AM";
          const formattedHour = Number(h) % 12 || 12;
          const timeInfo = `${formattedHour}:${m} ${ampm} • ${event.location || "Virtual"}`;

          // Persist to notifications table
          const createdAt = now.toISOString();
          await db.run(
            `INSERT INTO notifications (title, body, timeInfo, unread, createdAt)
             VALUES (?, ?, ?, 1, ?)`,
            [notificationTitle, notificationBody, timeInfo, createdAt]
          );

          // Mark event reminder as sent
          await db.run("UPDATE events SET reminderSent = 1 WHERE id = ?", [event.id]);

          console.log(`[SCHEDULER] Triggered reminder for meeting: "${event.title}". Starts in ${diffMinutes} min.`);
        } else if (nowMs >= endMs) {
          // If the meeting has fully ended, just mark reminder as sent so we don't process it anymore
          await db.run("UPDATE events SET reminderSent = 1 WHERE id = ?", [event.id]);
          console.log(`[SCHEDULER] Marked past meeting "${event.title}" reminder as processed.`);
        }
      }
    } catch (error) {
      console.error("[SCHEDULER] Error processing reminder checks:", error);
    }
  }, 60000);

  console.log("[SCHEDULER] Meeting reminder scheduler running (1-minute intervals).");
}
