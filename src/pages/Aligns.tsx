import React from "react";
import { useLocation } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { EmptyState } from "../components/ui/EmptyState";
import { ArrowLeftRight, Clock3 } from "lucide-react";

export const Aligns: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAwaiting = searchParams.get("awaiting") === "true";

  return (
    <AppShell>
      {/* Header Context */}
      <div className="text-left">
        <h1 className="text-2xl font-semibold text-primary-text tracking-tight">
          {isAwaiting ? "Awaiting Actions" : "Campus Alignment Policies"}
        </h1>
        <p className="text-sm text-secondary-text mt-1">
          {isAwaiting
            ? "Pending administrative alignment approvals and reviews."
            : "Review alignment guidelines and curriculum standardization patterns."}
        </p>
      </div>

      {isAwaiting ? (
        <EmptyState
          icon={<Clock3 className="w-6 h-6 animate-pulse text-amber-500" />}
          title="Awaiting Approval Ledger"
          description="⌛ Module Pending Integration. The action approval workflows will be deployed in Part 2."
        />
      ) : (
        <EmptyState
          icon={<ArrowLeftRight className="w-6 h-6 text-primary-blue" />}
          title="Alignment Engine"
          description="⌛ Module Pending Integration. Core compliance alignment services will be activated in Part 2."
        />
      )}
    </AppShell>
  );
};
