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

export const calendarService = {
  // Get all events
  async getEvents(): Promise<CalendarEvent[]> {
    const res = await fetch("/api/calendar/events");
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to load events");
    }
    const json = await res.json();
    return json.data;
  },

  // Get single event
  async getEvent(id: number): Promise<CalendarEvent> {
    const res = await fetch(`/api/calendar/events/${id}`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to load event");
    }
    const json = await res.json();
    return json.data;
  },

  // Create event
  async createEvent(event: CalendarEvent): Promise<CalendarEvent> {
    const res = await fetch("/api/calendar/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to create event");
    }
    const json = await res.json();
    return json.data;
  },

  // Update event
  async updateEvent(id: number, event: CalendarEvent): Promise<CalendarEvent> {
    const res = await fetch(`/api/calendar/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update event");
    }
    const json = await res.json();
    return json.data;
  },

  // Delete event
  async deleteEvent(id: number): Promise<void> {
    const res = await fetch(`/api/calendar/events/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete event");
    }
  },

  // Get notifications
  async getNotifications(): Promise<NotificationItem[]> {
    const res = await fetch("/api/calendar/notifications");
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to load notifications");
    }
    const json = await res.json();
    return json.data;
  },

  // Mark all notifications as read
  async markNotificationsRead(): Promise<void> {
    const res = await fetch("/api/calendar/notifications/mark-read", {
      method: "POST",
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to mark notifications read");
    }
  },
};
