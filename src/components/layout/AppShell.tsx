import React from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AppShellProps {
  children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="flex w-screen h-screen overflow-hidden bg-page-bg font-sans">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Topbar />

        {/* Scrollable Content Container */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
