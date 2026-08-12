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
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const mainNavItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Campus", path: "/campus", icon: Building2 },
    { name: "Aligns", path: "/aligns", icon: ArrowLeftRight },
    { name: "Awaiting", path: "/aligns?awaiting=true", icon: Clock3 }, // dynamic demo link to show awaiting state
  ];

  const bottomNavItems = [
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "Help", path: "/help", icon: HelpCircle },
  ];

  return (
    <aside className="w-[260px] h-screen bg-[#0B162B] flex flex-col justify-between p-6 border-r border-[#1e293b] flex-shrink-0 select-none">
      {/* Top Part: Logo */}
      <div className="flex flex-col gap-8">
        <NavLink to="/dashboard" className="block focus:outline-none">
          <RegionOSLogo variant="dark" size="sm" />
        </NavLink>

        {/* Navigation Section */}
        <nav className="flex flex-col gap-1.5">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => {
                const baseClass =
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group focus:outline-none focus:ring-1 focus:ring-primary-blue";
                return isActive
                  ? `${baseClass} bg-[#1465D8] text-white shadow-sm font-semibold`
                  : `${baseClass} text-[#9CA3AF] hover:text-white hover:bg-white/5`;
              }}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
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
              className={({ isActive }) => {
                const baseClass =
                  "flex items-center gap-3 px-4 py-2 text-sm font-medium transition-all group focus:outline-none";
                return isActive
                  ? `${baseClass} bg-[#1465D8] text-white shadow-sm`
                  : `${baseClass} text-[#9CA3AF] hover:text-white hover:bg-white/5`;
              }}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/login"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all focus:outline-none"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};
