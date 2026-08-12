import React from "react";
import { AppShell } from "../components/layout/AppShell";
import { EmptyState } from "../components/ui/EmptyState";
import { Hourglass } from "lucide-react";

export const Aligns: React.FC = () => {
  return (
    <AppShell>
      {/* Header Context */}
      <div className="text-left pb-4 border-b border-border-color">
        <h1 className="text-2xl font-bold text-primary-text tracking-tight m-0">
          Aligns
        </h1>
        <p className="text-sm text-secondary-text mt-1">
          Regional alignment tracking and strategic initiative oversight.
        </p>
      </div>

      {/* Reusable pending integration layout */}
      <EmptyState
        icon={<Hourglass className="w-6 h-6 text-secondary-text/80 animate-pulse" />}
        title="Awaiting..."
        description="Module Pending Integration"
      />
    </AppShell>
  );
};
