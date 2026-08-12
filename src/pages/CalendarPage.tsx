import React, { useEffect, useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { calendarService } from "../services/calendarService";
import type { CalendarEvent } from "../services/calendarService";
import { Calendar as CalendarIcon, Clock, MapPin, Plus, Trash2, CheckCircle, X, Edit2 } from "lucide-react";

export const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [reminderMinutes, setReminderMinutes] = useState(10);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await calendarService.getEvents();
      setEvents(data);
    } catch (err: any) {
      console.error(err);
      triggerToast("Failed to load meetings.");
    } finally {
      setLoading(false);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setTitle("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setLocation("");
    setDescription("");
    setReminderMinutes(10);
    setErrorMsg(null);
    setShowModal(true);
  };

  const openEditModal = (event: CalendarEvent) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDate(event.date);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setLocation(event.location || "");
    setDescription(event.description || "");
    setReminderMinutes(event.reminderMinutes);
    setErrorMsg(null);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation checks
    if (!title.trim()) {
      setErrorMsg("Meeting title is required.");
      return;
    }
    if (!date) {
      setErrorMsg("Date is required.");
      return;
    }
    if (!startTime || !endTime) {
      setErrorMsg("Start and end times are required.");
      return;
    }

    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    if (endH * 60 + endM <= startH * 60 + startM) {
      setErrorMsg("End time must be after start time.");
      return;
    }

    const payload: CalendarEvent = {
      title,
      date,
      startTime,
      endTime,
      location,
      description,
      reminderMinutes: Number(reminderMinutes),
    };

    try {
      if (editingEvent && editingEvent.id !== undefined) {
        await calendarService.updateEvent(editingEvent.id, payload);
        triggerToast("Meeting updated successfully.");
      } else {
        await calendarService.createEvent(payload);
        triggerToast("Meeting created successfully.");
      }
      setShowModal(false);
      loadEvents();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save meeting.");
    }
  };

  const handleDelete = async () => {
    if (!editingEvent || editingEvent.id === undefined) return;
    if (!window.confirm("Are you sure you want to delete this meeting?")) return;

    try {
      await calendarService.deleteEvent(editingEvent.id);
      triggerToast("Meeting deleted successfully.");
      setShowModal(false);
      loadEvents();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete meeting.");
    }
  };

  return (
    <AppShell>
      {/* Success Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-dark-navy text-white border border-[#1e293b] px-4 py-3 rounded-lg flex items-center gap-2.5 shadow-lg animate-bounce text-xs font-semibold font-mono tracking-wide select-none">
          <CheckCircle className="w-4 h-4 text-success-green" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-border-color rounded-2xl shadow-xl overflow-hidden p-6 text-left flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-border-color pb-3">
              <h3 className="text-base font-bold text-primary-text">
                {editingEvent ? "Edit Meeting" : "Schedule New Meeting"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-secondary-text hover:text-primary-text focus:outline-none cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-danger-red/10 border border-danger-red/20 rounded-lg text-xs text-danger-red font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <Input
                label="MEETING TITLE"
                placeholder="e.g. Regional Operations Review"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <Input
                    label="DATE"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="START TIME"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="END TIME"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Input
                label="LOCATION"
                placeholder="e.g. Regional Conference Room / Zoom link"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-semibold text-secondary-text uppercase tracking-wider font-mono">
                  Description
                </label>
                <textarea
                  placeholder="Provide meeting agenda or notes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="regionos-input min-h-20"
                />
              </div>

              <Input
                label="REMINDER (MINUTES BEFORE)"
                type="number"
                min="0"
                value={reminderMinutes}
                onChange={(e) => setReminderMinutes(Number(e.target.value))}
                required
              />

              <div className="flex items-center justify-between mt-4 border-t border-border-color pt-3.5">
                {editingEvent ? (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={handleDelete}
                    className="flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </Button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowModal(false)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="blue"
                    size="sm"
                    className="cursor-pointer font-semibold"
                  >
                    {editingEvent ? "Save Changes" : "Create Meeting"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header Context */}
      <div className="flex items-center justify-between text-left pb-4 border-b border-border-color">
        <div>
          <h1 className="text-2xl font-bold text-primary-text tracking-tight m-0">
            Calendar
          </h1>
          <p className="text-sm text-secondary-text mt-1">
            Regional schedules and operations coordination meetings.
          </p>
        </div>
        <Button
          variant="blue"
          onClick={openCreateModal}
          className="flex items-center gap-1.5 py-2 px-4 text-xs font-semibold tracking-wider uppercase font-mono shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Meeting
        </Button>
      </div>

      {/* Content grid */}
      <div className="flex flex-col gap-6 text-left mt-4">
        {loading ? (
          <div className="py-12 text-center text-sm text-secondary-text font-mono">
            Loading scheduled events...
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => {
              // Format date nicely
              const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              const dateObj = new Date(`${event.date}T00:00:00`);
              const formattedDate = dateObj.toLocaleDateString('en-US', options);

              // Helper for 12h time format conversion
              const format12h = (time: string) => {
                const [h, m] = time.split(":");
                const ampm = Number(h) >= 12 ? "PM" : "AM";
                const formattedHour = Number(h) % 12 || 12;
                return `${formattedHour}:${m} ${ampm}`;
              };

              return (
                <Card key={event.id} className="p-6 flex flex-col justify-between items-stretch hover:shadow-md transition-shadow relative border border-border-color">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-base font-bold text-primary-text pr-8 m-0 leading-snug">
                        {event.title}
                      </h3>
                      <button
                        onClick={() => openEditModal(event)}
                        className="text-secondary-text hover:text-primary-blue p-1 rounded hover:bg-muted-bg/50 focus:outline-none transition-colors absolute right-4 top-4 cursor-pointer"
                        aria-label="Edit meeting"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>

                    {event.description && (
                      <p className="text-xs text-secondary-text leading-relaxed">
                        {event.description}
                      </p>
                    )}

                    <div className="flex flex-col gap-2 mt-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-secondary-text">
                        <CalendarIcon className="w-3.5 h-3.5 text-primary-blue shrink-0" />
                        <span>{formattedDate}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-semibold text-secondary-text">
                        <Clock className="w-3.5 h-3.5 text-secondary-text shrink-0" />
                        <span className="font-mono">{format12h(event.startTime)} – {format12h(event.endTime)}</span>
                      </div>

                      {event.location && (
                        <div className="flex items-center gap-2 text-xs text-secondary-text">
                          <MapPin className="w-3.5 h-3.5 text-secondary-text shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-border-color mt-4 pt-3.5 flex justify-between items-center text-[10px] font-bold font-mono uppercase tracking-wider text-secondary-text">
                    <span>Reminder: {event.reminderMinutes} min before</span>
                    {event.reminderSent ? (
                      <Badge variant="success">REMINDER SENT</Badge>
                    ) : (
                      <Badge variant="neutral">PENDING</Badge>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center text-secondary-text text-sm border-dashed">
            No meetings scheduled. Click the button to create your first meeting.
          </Card>
        )}
      </div>
    </AppShell>
  );
};
