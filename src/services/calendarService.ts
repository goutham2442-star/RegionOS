export interface CalendarEvent {
  id?: number;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  reminderMinutes: number;
  reminderSent?: number;
}

export interface NotificationItem {
  id: number;
  title: string;
  body: string;
  timeInfo?: string;
  unread: number;
  createdAt: string;
}

// Safe API fetch and parse helper
async function safeJsonFetch(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, options);
    
    if (!res.ok) {
      let errMsg = "Unable to connect to Calendar service. Please try again.";
      try {
        const errJson = await res.json();
        if (errJson && errJson.message) {
          errMsg = errJson.message;
        }
      } catch (e) {
        // Ignored, fallback to generic error message
      }
      throw new Error(errMsg);
    }

    const text = await res.text();
    if (!text || text.trim() === "") {
      return { success: true };
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error("Unable to connect to Calendar service. Please try again.");
    }
  } catch (err: any) {
    throw new Error(err.message || "Unable to connect to Calendar service. Please try again.");
  }
}

export const calendarService = {
  // Get all events
  async getEvents(): Promise<CalendarEvent[]> {
    const json = await safeJsonFetch("/api/calendar/events");
    return json.data || [];
  },

  // Get single event
  async getEvent(id: number): Promise<CalendarEvent> {
    const json = await safeJsonFetch(`/api/calendar/events/${id}`);
    return json.data;
  },

  // Create event
  async createEvent(event: CalendarEvent): Promise<CalendarEvent> {
    const json = await safeJsonFetch("/api/calendar/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    return json.data;
  },

  // Update event
  async updateEvent(id: number, event: CalendarEvent): Promise<CalendarEvent> {
    const json = await safeJsonFetch(`/api/calendar/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    return json.data;
  },

  // Delete event
  async deleteEvent(id: number): Promise<void> {
    await safeJsonFetch(`/api/calendar/events/${id}`, {
      method: "DELETE",
    });
  },

  // Get notifications
  async getNotifications(): Promise<NotificationItem[]> {
    const json = await safeJsonFetch("/api/calendar/notifications");
    return json.data || [];
  },

  // Mark all notifications as read
  async markNotificationsRead(): Promise<void> {
    await safeJsonFetch("/api/calendar/notifications/mark-read", {
      method: "POST",
    });
  },
};
