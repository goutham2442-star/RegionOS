import React from "react";

interface ProgressBarProps {
  value: number; // percentage value from 0 to 100
  color?: "blue" | "green" | "amber" | "red";
  className?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = "blue",
  className = "",
  showPercentage = true,
}) => {
  const percentage = Math.max(0, Math.min(100, value));

  const colors = {
    blue: "bg-primary-blue",
    green: "bg-success-green",
    amber: "bg-warning-amber",
    red: "bg-danger-red",
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1 text-xs text-secondary-text">
        <span className="font-medium">Progress</span>
        {showPercentage && <span className="font-semibold font-mono">{percentage.toFixed(1)}%</span>}
      </div>
      <div className="w-full bg-border-color rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
