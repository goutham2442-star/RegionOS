import React from "react";
import { NavLink } from "react-router-dom";
import { RegionOSLogo } from "../brand/RegionOSLogo";
import {
  LayoutDashboard,
  Building2,
  ArrowLeftRight,
  Clock3,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const mainNavItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Campus", path: "/campus", icon: Building2 },
    { name: "Aligns", path: "/aligns", icon: ArrowLeftRight },
    { name: "Awaiting", path: "/aligns?awaiting=true", icon: Clock3 },
  ];

  const bottomNavItems = [
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "Help", path: "/help", icon: HelpCircle },
  ];

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 md:hidden cursor-pointer"
        />
      )}

      <aside
        className={`w-65 h-screen bg-dark-navy flex flex-col justify-between p-6 border-r border-[#1e293b] shrink-0 select-none fixed md:relative inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Part: Logo & Close Button */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <NavLink to="/dashboard" onClick={handleLinkClick} className="block focus:outline-none">
              <RegionOSLogo variant="dark" size="sm" />
            </NavLink>
            {/* Close button on mobile */}
            <button
              onClick={onClose}
              className="p-1 text-[#9CA3AF] hover:text-white md:hidden cursor-pointer focus:outline-none"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Section */}
          <nav className="flex flex-col gap-1.5">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={handleLinkClick}
                className={({ isActive }) => {
                  const baseClass =
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group focus:outline-none focus:ring-1 focus:ring-primary-blue";
                  return isActive
                    ? `${baseClass} bg-primary-blue text-white shadow-sm font-semibold`
                    : `${baseClass} text-[#9CA3AF] hover:text-white hover:bg-white/5`;
                }}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Part: Settings, Help, Logout */}
        <div className="flex flex-col gap-4 border-t border-[#1e293b] pt-5">
          <nav className="flex flex-col gap-1.5">
            {bottomNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={handleLinkClick}
                className={({ isActive }) => {
                  const baseClass =
                    "flex items-center gap-3 px-4 py-2 text-sm font-medium transition-all group focus:outline-none";
                  return isActive
                    ? `${baseClass} bg-primary-blue text-white shadow-sm`
                    : `${baseClass} text-[#9CA3AF] hover:text-white hover:bg-white/5`;
                }}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <NavLink
            to="/login"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all focus:outline-none"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
