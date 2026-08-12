import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, User, Menu } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { authService } from "../../services/authService";
import type { UserProfile } from "../../data/mockProfileData";

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    authService.getCurrentUser().then(setProfile);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-border-color flex items-center justify-between px-6 md:px-8 select-none">
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
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="p-2 text-secondary-text hover:text-primary-blue hover:bg-muted-bg rounded-full transition-all relative focus:outline-none cursor-pointer" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-blue rounded-full" />
        </button>

        {/* Vertical divider */}
        <div className="w-px h-6 bg-border-color" />

        {/* User Info & Avatar */}
        <Link
          to="/profile"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none"
        >
          <div className="text-right hidden sm:flex flex-col text-left">
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
