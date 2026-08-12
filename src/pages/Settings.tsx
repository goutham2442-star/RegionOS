import React from "react";
import { AppShell } from "../components/layout/AppShell";
import { EmptyState } from "../components/ui/EmptyState";
import { Settings as SettingsIcon } from "lucide-react";

export const Settings: React.FC = () => {
  return (
    <AppShell>
      <div className="text-left">
        <h1 className="text-2xl font-semibold text-primary-text tracking-tight">
          System Settings
        </h1>
        <p className="text-sm text-secondary-text mt-1">
          Adjust configuration parameters and global audit limits.
        </p>
      </div>

      <EmptyState
        icon={<SettingsIcon className="w-6 h-6 text-primary-blue" />}
        title="Configuration Console"
        description="⌛ Module Pending Integration. Settings and admin terminal controls will be enabled in Part 2."
      />
    </AppShell>
  );
};
