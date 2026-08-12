import React, { useEffect, useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { calendarService } from "../services/calendarService";
import type { CalendarEvent } from "../services/calendarService";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Plus,
  Trash2,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// List of hours to display in Week & Day views
const HOURS = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

export const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calendar View Configuration
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 7, 10)); // Seeded centered around August 2026
  const [activeView, setActiveView] = useState<"month" | "week" | "day" | "list">("month");

  // Modal Dialogs
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

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
      triggerToast(err.message || "Failed to load meetings.");
    } finally {
      setLoading(false);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper date formatters
  const formatDateKey = (d: Date): string => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const getMonthName = (d: Date): string => {
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const getWeekRangeName = (days: Date[]): string => {
    if (days.length === 0) return "";
    const start = days[0].toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const end = days[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    return `${start} – ${end}`;
  };

  // Date generators
  const getMonthDays = (baseDate: Date): Date[] => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    const days: Date[] = [];
    const startDay = startOfMonth.getDay();

    // Previous month padding
    for (let i = startDay - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Current month
    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Next month padding
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const getWeekDays = (baseDate: Date): Date[] => {
    const startOfWeek = new Date(baseDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);

    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  };

  // Navigations
  const handlePrev = () => {
    const nextDate = new Date(currentDate);
    if (activeView === "month") {
      nextDate.setMonth(nextDate.getMonth() - 1);
    } else if (activeView === "week") {
      nextDate.setDate(nextDate.getDate() - 7);
    } else if (activeView === "day") {
      nextDate.setDate(nextDate.getDate() - 1);
    }
    setCurrentDate(nextDate);
  };

  const handleNext = () => {
    const nextDate = new Date(currentDate);
    if (activeView === "month") {
      nextDate.setMonth(nextDate.getMonth() + 1);
    } else if (activeView === "week") {
      nextDate.setDate(nextDate.getDate() + 7);
    } else if (activeView === "day") {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    setCurrentDate(nextDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const openCreateModal = () => {
    setSelectedEvent(null);
    setTitle("");
    setDate(formatDateKey(new Date()));
    setStartTime("10:00");
    setEndTime("11:00");
    setLocation("");
    setDescription("");
    setReminderMinutes(10);
    setErrorMsg(null);
    setShowCreateModal(true);
  };

  const handleListViewEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  // Click slot handlers
  const handleDayClick = (d: Date) => {
    setDate(formatDateKey(d));
    setTitle("");
    setStartTime("10:00");
    setEndTime("11:00");
    setLocation("");
    setDescription("");
    setReminderMinutes(10);
    setErrorMsg(null);
    setSelectedEvent(null);
    setShowCreateModal(true);
  };

  const handleTimeSlotClick = (d: Date, hourStr: string) => {
    setDate(formatDateKey(d));
    setTitle("");
    setStartTime(hourStr);
    
    // Set end hour 1 hour later
    const [h, m] = hourStr.split(":").map(Number);
    const nextH = String((h + 1) % 24).padStart(2, "0");
    setEndTime(`${nextH}:${String(m).padStart(2, "0")}`);
    
    setLocation("");
    setDescription("");
    setReminderMinutes(10);
    setErrorMsg(null);
    setSelectedEvent(null);
    setShowCreateModal(true);
  };

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const openEditFromDetails = () => {
    if (!selectedEvent) return;
    setTitle(selectedEvent.title);
    setDate(selectedEvent.date);
    setStartTime(selectedEvent.startTime);
    setEndTime(selectedEvent.endTime);
    setLocation(selectedEvent.location || "");
    setDescription(selectedEvent.description || "");
    setReminderMinutes(selectedEvent.reminderMinutes);
    setErrorMsg(null);
    setShowDetailsModal(false);
    setShowCreateModal(true);
  };

  // Submit & Delete handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

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
      if (selectedEvent && selectedEvent.id !== undefined) {
        await calendarService.updateEvent(selectedEvent.id, payload);
        triggerToast("Meeting updated successfully.");
      } else {
        await calendarService.createEvent(payload);
        triggerToast("Meeting created successfully.");
      }
      setShowCreateModal(false);
      loadEvents();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save meeting.");
    }
  };

  const handleDelete = async () => {
    const targetId = selectedEvent?.id;
    if (targetId === undefined) return;
    if (!window.confirm("Are you sure you want to delete this meeting?")) return;

    try {
      await calendarService.deleteEvent(targetId);
      triggerToast("Meeting deleted successfully.");
      setShowDetailsModal(false);
      setShowCreateModal(false);
      loadEvents();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete meeting.");
    }
  };

  const format12h = (time: string) => {
    const [h, m] = time.split(":");
    const ampm = Number(h) >= 12 ? "PM" : "AM";
    const formattedHour = Number(h) % 12 || 12;
    return `${formattedHour}:${m} ${ampm}`;
  };

  // Filter events by day
  const getEventsForDay = (d: Date): CalendarEvent[] => {
    const key = formatDateKey(d);
    return events.filter(e => e.date === key);
  };

  // Render Month View Grid
  const renderMonthView = () => {
    const days = getMonthDays(currentDate);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="flex flex-col border border-border-color rounded-xl overflow-hidden bg-white select-none">
        <div className="grid grid-cols-7 border-b border-border-color bg-muted-bg/30 text-xs font-bold text-secondary-text font-mono uppercase tracking-wider text-center py-3">
          {weekdays.map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 grid-rows-6 divide-y divide-x divide-border-color border-collapse">
          {days.map((day, idx) => {
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const dayEvents = getEventsForDay(day);
            const isToday = formatDateKey(day) === formatDateKey(new Date());

            return (
              <div
                key={idx}
                onClick={() => handleDayClick(day)}
                className={`min-h-24 p-2 flex flex-col justify-between items-stretch transition-colors cursor-pointer border-t border-l border-border-color hover:bg-muted-bg/20 ${
                  isCurrentMonth ? "bg-white" : "bg-muted-bg/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold font-mono p-1 w-6 h-6 rounded-full flex items-center justify-center ${
                      isToday ? "bg-primary-blue text-white shadow-sm" : isCurrentMonth ? "text-primary-text" : "text-secondary-text/50"
                    }`}
                  >
                    {day.getDate()}
                  </span>
                </div>

                <div className="flex flex-col gap-1 mt-1 overflow-y-auto max-h-16 scrollbar-none">
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      onClick={(e) => handleEventClick(e, event)}
                      className="bg-primary-blue/10 border border-primary-blue/20 text-primary-blue text-[10px] font-semibold rounded px-1.5 py-0.5 truncate leading-tight select-none text-left"
                    >
                      <span className="font-mono font-bold mr-0.5">{format12h(event.startTime)}</span> {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Week View Columns
  const renderWeekView = () => {
    const days = getWeekDays(currentDate);

    return (
      <div className="flex flex-col border border-border-color rounded-xl overflow-hidden bg-white select-none">
        {/* Header Row */}
        <div className="grid grid-cols-8 border-b border-border-color bg-muted-bg/30 text-xs font-bold text-secondary-text font-mono uppercase tracking-wider py-3 text-center">
          <div className="border-r border-border-color">Time</div>
          {days.map(day => {
            const isToday = formatDateKey(day) === formatDateKey(new Date());
            return (
              <div key={day.getTime()} className="flex flex-col items-center">
                <span>{day.toLocaleDateString("en-US", { weekday: "short" })}</span>
                <span className={`text-[10px] font-bold p-0.5 rounded-full ${isToday ? "bg-primary-blue text-white w-5 h-5 flex items-center justify-center mt-0.5" : "text-secondary-text"}`}>
                  {day.getDate()}
                </span>
              </div>
            );
          })}
        </div>

        {/* Hourly Rows */}
        <div className="divide-y divide-border-color">
          {HOURS.map(hour => (
            <div key={hour} className="grid grid-cols-8">
              <div className="py-3 text-[10px] font-bold font-mono text-secondary-text border-r border-border-color text-center bg-muted-bg/5">
                {hour}
              </div>
              {days.map(day => {
                const dayEvents = getEventsForDay(day).filter(e => e.startTime.startsWith(hour.slice(0, 2)));

                return (
                  <div
                    key={day.getTime()}
                    onClick={() => handleTimeSlotClick(day, hour)}
                    className="p-1 hover:bg-muted-bg/10 transition-colors not-last:border-r not-last:border-border-color min-h-16 relative cursor-pointer"
                  >
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        onClick={(e) => handleEventClick(e, event)}
                        className="bg-primary-blue/15 border border-primary-blue/30 text-primary-blue text-[10px] font-bold rounded p-1.5 leading-snug w-full select-none text-left mb-1 hover:shadow"
                      >
                        <div className="font-mono flex items-center gap-0.5 mb-0.5">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{format12h(event.startTime)}</span>
                        </div>
                        <div className="truncate">{event.title}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Day View
  const renderDayView = () => {
    const isToday = formatDateKey(currentDate) === formatDateKey(new Date());

    return (
      <div className="flex flex-col border border-border-color rounded-xl overflow-hidden bg-white select-none max-w-2xl mx-auto">
        <div className="bg-muted-bg/30 border-b border-border-color p-4 text-center">
          <span className="text-sm font-bold text-primary-text font-mono uppercase tracking-wide">
            {currentDate.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
          {isToday && (
            <span className="ml-2 bg-primary-blue/10 text-primary-blue text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded border border-primary-blue/20">
              TODAY
            </span>
          )}
        </div>

        <div className="divide-y divide-border-color">
          {HOURS.map(hour => {
            const dayEvents = getEventsForDay(currentDate).filter(e => e.startTime.startsWith(hour.slice(0, 2)));

            return (
              <div key={hour} className="grid grid-cols-5 min-h-16">
                <div className="col-span-1 py-3 text-[10px] font-bold font-mono text-secondary-text border-r border-border-color text-center bg-muted-bg/5 flex items-center justify-center">
                  {hour}
                </div>
                <div
                  onClick={() => handleTimeSlotClick(currentDate, hour)}
                  className="col-span-4 p-2 hover:bg-muted-bg/10 transition-colors relative cursor-pointer"
                >
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      onClick={(e) => handleEventClick(e, event)}
                      className="bg-primary-blue/15 border border-primary-blue/30 text-primary-blue text-xs font-bold rounded p-2.5 leading-snug w-full select-none text-left mb-1 hover:shadow"
                    >
                      <div className="font-mono flex items-center gap-1 mb-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{format12h(event.startTime)} – {format12h(event.endTime)}</span>
                        {event.location && (
                          <span className="ml-2 font-sans text-secondary-text flex items-center gap-0.5">
                            <MapPin className="w-3.5 h-3.5" /> {event.location}
                          </span>
                        )}
                      </div>
                      <div className="mt-1">{event.title}</div>
                      {event.description && (
                        <p className="text-[10px] font-normal text-secondary-text mt-1">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render List View
  const renderListView = () => {
    return (
      <div className="flex flex-col gap-4 max-w-3xl mx-auto text-left">
        {events.length > 0 ? (
          events.map(event => {
            const dateObj = new Date(`${event.date}T00:00:00`);
            const formattedDate = dateObj.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });

            return (
              <Card
                key={event.id}
                onClick={() => handleListViewEventClick(event)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-primary-blue/30 transition-all border border-border-color"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold text-primary-text m-0">{event.title}</h3>
                  {event.description && (
                    <p className="text-xs text-secondary-text leading-relaxed max-w-xl">{event.description}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-secondary-text font-mono uppercase mt-1">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5 text-primary-blue" /> {formattedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {format12h(event.startTime)} – {format12h(event.endTime)}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1 font-sans text-secondary-text font-normal">
                        <MapPin className="w-3.5 h-3.5" /> {event.location}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {event.reminderSent ? (
                    <Badge variant="success">SENT</Badge>
                  ) : (
                    <Badge variant="neutral">PENDING</Badge>
                  )}
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="p-12 text-center text-secondary-text text-sm border-dashed">
            No meetings scheduled.
          </Card>
        )}
      </div>
    );
  };

  return (
    <AppShell>
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-dark-navy text-white border border-[#1e293b] px-4 py-3 rounded-lg flex items-center gap-2.5 shadow-lg animate-bounce text-xs font-semibold font-mono tracking-wide select-none">
          <CheckCircle className="w-4 h-4 text-success-green" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-border-color rounded-2xl shadow-xl overflow-hidden p-6 text-left flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-border-color pb-3">
              <h3 className="text-base font-bold text-primary-text">
                {selectedEvent ? "Edit Meeting" : "Schedule New Meeting"}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
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

              <div className="flex items-center justify-end gap-2 mt-4 border-t border-border-color pt-3.5">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
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
                  {selectedEvent ? "Save Changes" : "Create Meeting"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Event Modal */}
      {showDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white border border-border-color rounded-2xl shadow-xl overflow-hidden p-6 text-left flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-border-color pb-3">
              <h3 className="text-base font-bold text-primary-text">Meeting Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-secondary-text hover:text-primary-text focus:outline-none cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <h4 className="text-base font-bold text-primary-text m-0">{selectedEvent.title}</h4>
                {selectedEvent.description && (
                  <p className="text-xs text-secondary-text leading-relaxed mt-2">{selectedEvent.description}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-border-color">
                <div className="flex items-center gap-2 text-xs font-semibold text-secondary-text">
                  <CalendarIcon className="w-3.5 h-3.5 text-primary-blue shrink-0" />
                  <span>{new Date(`${selectedEvent.date}T00:00:00`).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-secondary-text">
                  <Clock className="w-3.5 h-3.5 text-secondary-text shrink-0" />
                  <span className="font-mono">{format12h(selectedEvent.startTime)} – {format12h(selectedEvent.endTime)}</span>
                </div>

                {selectedEvent.location && (
                  <div className="flex items-center gap-2 text-xs text-secondary-text">
                    <MapPin className="w-3.5 h-3.5 text-secondary-text shrink-0" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs font-semibold text-secondary-text font-mono uppercase tracking-wider mt-1">
                  <span>Reminder:</span>
                  <Badge variant={selectedEvent.reminderSent ? "success" : "neutral"}>
                    {selectedEvent.reminderMinutes} min before ({selectedEvent.reminderSent ? "sent" : "pending"})
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-5 border-t border-border-color pt-3.5">
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={handleDelete}
                className="flex items-center gap-1 cursor-pointer font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowDetailsModal(false)}
                  className="cursor-pointer"
                >
                  Close
                </Button>
                <Button
                  type="button"
                  variant="blue"
                  size="sm"
                  onClick={openEditFromDetails}
                  className="cursor-pointer font-semibold"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left pb-4 border-b border-border-color">
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
          className="flex items-center gap-1.5 py-2 px-4 text-xs font-semibold tracking-wider uppercase font-mono shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create Meeting
        </Button>
      </div>

      {/* Navigation Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 text-left select-none">
        {/* Date navigations */}
        <div className="flex items-center gap-2.5">
          <Button variant="secondary" size="sm" onClick={handleToday} className="font-mono text-xs uppercase px-3 py-1.5">
            Today
          </Button>

          <div className="flex items-center gap-1 border border-border-color rounded-lg bg-white p-0.5">
            <button
              onClick={handlePrev}
              className="p-1.5 text-secondary-text hover:text-primary-text hover:bg-muted-bg/50 rounded transition-colors focus:outline-none cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 text-secondary-text hover:text-primary-text hover:bg-muted-bg/50 rounded transition-colors focus:outline-none cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <span className="text-sm font-bold text-primary-text font-mono uppercase tracking-wide">
            {activeView === "month" && getMonthName(currentDate)}
            {activeView === "week" && getWeekRangeName(getWeekDays(currentDate))}
            {activeView === "day" && currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>

        {/* View mode toggle switches */}
        <div className="flex items-center gap-1 border border-border-color rounded-lg bg-white p-0.5 text-xs font-mono uppercase font-bold tracking-wider text-secondary-text self-start sm:self-auto">
          <button
            onClick={() => setActiveView("month")}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer focus:outline-none ${
              activeView === "month" ? "bg-primary-blue text-white font-semibold shadow-sm" : "hover:text-primary-text hover:bg-muted-bg/30"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setActiveView("week")}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer focus:outline-none ${
              activeView === "week" ? "bg-primary-blue text-white font-semibold shadow-sm" : "hover:text-primary-text hover:bg-muted-bg/30"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setActiveView("day")}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer focus:outline-none ${
              activeView === "day" ? "bg-primary-blue text-white font-semibold shadow-sm" : "hover:text-primary-text hover:bg-muted-bg/30"
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setActiveView("list")}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer focus:outline-none ${
              activeView === "list" ? "bg-primary-blue text-white font-semibold shadow-sm" : "hover:text-primary-text hover:bg-muted-bg/30"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="mt-2">
        {loading ? (
          <div className="py-12 text-center text-sm text-secondary-text font-mono select-none">
            Loading scheduled meetings...
          </div>
        ) : (
          <>
            {activeView === "month" && renderMonthView()}
            {activeView === "week" && renderWeekView()}
            {activeView === "day" && renderDayView()}
            {activeView === "list" && renderListView()}
          </>
        )}
      </div>
    </AppShell>
  );
};
