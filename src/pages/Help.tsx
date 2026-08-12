import React from "react";
import { AppShell } from "../components/layout/AppShell";
import { EmptyState } from "../components/ui/EmptyState";
import { HelpCircle } from "lucide-react";

export const Help: React.FC = () => {
  return (
    <AppShell>
      <div className="text-left">
        <h1 className="text-2xl font-semibold text-primary-text tracking-tight">
          Help & Support
        </h1>
        <p className="text-sm text-secondary-text mt-1">
          Access the operations manual and contact regional administrators.
        </p>
      </div>

      <EmptyState
        icon={<HelpCircle className="w-6 h-6 text-primary-blue" />}
        title="Support Center"
        description="⌛ Module Pending Integration. User guide and support tickets system will be deployed in Part 2."
      />
    </AppShell>
  );
};
