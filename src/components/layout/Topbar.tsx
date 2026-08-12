import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Bell, User, Menu, Check, Sparkles } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { authService } from "../../services/authService";
import { calendarService } from "../../services/calendarService";
import type { UserProfile } from "../../data/mockProfileData";
import type { NotificationItem } from "../../services/calendarService";

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    authService.getCurrentUser().then(setProfile);
    
    // Initial fetch & polling setup for reminders
    fetchNotifications();
    const pollInterval = setInterval(fetchNotifications, 5000);

    // Close panel on outside click
    const handleOutsideClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPanel(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      clearInterval(pollInterval);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await calendarService.getNotifications();
      setNotifications(data);
      
      // Request browser notification if permission is granted and there are new unread ones
      if (Notification.permission === "granted") {
        data.forEach(item => {
          // Check if this was created within the last 10 seconds to avoid spamming historical alerts
          const createdTime = new Date(item.createdAt).getTime();
          const tenSecAgo = Date.now() - 10000;
          if (item.unread && createdTime > tenSecAgo) {
            // Check if we've already displayed this specific alert recently (using sessionStorage cache to prevent duplicate alerts)
            const alertKey = `alert-sent-${item.id}`;
            if (!sessionStorage.getItem(alertKey)) {
              new Notification(item.title, {
                body: `${item.body} ${item.timeInfo || ""}`,
              });
              sessionStorage.setItem(alertKey, "true");
            }
          }
        });
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await calendarService.markNotificationsRead();
      // Optimistically clear unread indicators locally
      setNotifications(prev => prev.map(n => ({ ...n, unread: 0 })));
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-white border-b border-border-color flex items-center justify-between px-6 md:px-8 select-none relative">
      {/* Breadcrumbs & Mobile Menu Button Left */}
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="mr-3 p-1.5 text-secondary-text hover:text-primary-blue hover:bg-muted-bg rounded-lg md:hidden focus:outline-none cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Breadcrumbs />
      </div>

      {/* Actions Right */}
      <div className="flex items-center gap-4 relative">
        {/* Notification Bell */}
        <button
          onClick={() => {
            setShowPanel(!showPanel);
            requestNotificationPermission(); // Request permissions gracefully on interaction
          }}
          className="p-2 text-secondary-text hover:text-primary-blue hover:bg-muted-bg rounded-full transition-all relative focus:outline-none cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-blue rounded-full animate-ping" />
          )}
        </button>

        {/* Notifications Popover Panel */}
        {showPanel && (
          <div
            ref={panelRef}
            className="absolute right-0 top-12 w-80 sm:w-96 bg-white border border-border-color rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col text-left animate-in fade-in slide-in-from-top-3 duration-200"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted-bg/30 border-b border-border-color">
              <span className="text-xs font-bold text-primary-text font-mono uppercase tracking-wider">
                Notifications ({unreadCount} unread)
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[10px] font-bold text-primary-blue hover:underline uppercase tracking-wider font-mono flex items-center gap-0.5 focus:outline-none cursor-pointer"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-border-color">
              {notifications.length > 0 ? (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 transition-colors flex items-start gap-3 ${
                      item.unread ? "bg-primary-blue/5" : "hover:bg-muted-bg/10"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-blue/10 text-primary-blue flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-primary-text">{item.title}</span>
                        {item.unread ? (
                          <span className="w-1.5 h-1.5 bg-primary-blue rounded-full" />
                        ) : null}
                      </div>
                      <p className="text-xs text-secondary-text leading-relaxed">{item.body}</p>
                      {item.timeInfo && (
                        <span className="text-[9px] font-bold text-secondary-text/80 font-mono uppercase tracking-wider mt-1 block">
                          {item.timeInfo}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-secondary-text font-mono select-none">
                  No notifications yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Vertical divider */}
        <div className="w-px h-6 bg-border-color" />

        {/* User Info & Avatar */}
        <Link
          to="/profile"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none"
        >
          <div className="text-right hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-primary-text leading-none">
              {profile?.name || "Administrator"}
            </span>
            <span className="text-[10px] font-medium text-secondary-text tracking-wide mt-0.5">
              {profile?.role || "Central Admin"}
            </span>
          </div>

          {/* User Avatar circle */}
          <div className="w-9 h-9 rounded-full bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue">
            <User className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </header>
  );
};
