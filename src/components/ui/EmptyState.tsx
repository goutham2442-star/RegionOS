import React from "react";
import { Clock3 } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title = "Module Pending Integration",
  description = "Awaiting...",
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center rounded-[14px] bg-white border border-border-color border-dashed ${className}`}>
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-muted-bg text-secondary-text">
        {icon || <Clock3 className="w-6 h-6 animate-pulse" />}
      </div>
      <h3 className="text-lg font-semibold text-primary-text mb-1">{title}</h3>
      <p className="text-sm text-secondary-text max-w-sm">{description}</p>
    </div>
  );
};
