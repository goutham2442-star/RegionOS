import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { EmptyState } from "../components/ui/EmptyState";
import { Button } from "../components/ui/Button";
import { BarChart3 } from "lucide-react";

export const AnalyticsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <AppShell>
      {/* Header Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between text-left gap-4 pb-4 border-b border-border-color">
        <div>
          <h1 className="text-2xl font-bold text-primary-text tracking-tight m-0">
            Power BI Dashboard
          </h1>
          <p className="text-sm text-secondary-text mt-1">
            In-depth analytics and institutional metrics
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => navigate(`/campus/${id}`)}>
          Back to Overview
        </Button>
      </div>

      {/* Main EmptyState */}
      <EmptyState
        icon={<BarChart3 className="w-6 h-6 text-primary-blue animate-bounce" />}
        title="Power BI Console"
        description="⌛ Module Pending Integration. Core compliance analytics, regression projections, and comparative reports will be configured in Stage 3."
      />
    </AppShell>
  );
};
