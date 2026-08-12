import React from "react";
import { Card } from "./Card";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number | string;
    isPositive?: boolean;
    label?: string;
  };
  highlighted?: boolean;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  trend,
  highlighted = false,
  className = "",
}) => {
  return (
    <Card
      className={`${
        highlighted ? "border-primary-blue bg-white shadow-sm ring-1 ring-primary-blue/30" : ""
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          {/* Monospace uppercase label with spacing */}
          <span className="text-[10px] font-bold text-secondary-text uppercase tracking-widest font-mono">
            {label}
          </span>
          <span className="text-2xl font-semibold text-primary-text tracking-tight mt-1">
            {value}
          </span>
        </div>
        {icon && (
          <div
            className={`p-2 rounded-lg shrink-0 ${
              highlighted ? "bg-primary-blue/10 text-primary-blue" : "bg-muted-bg/50 text-secondary-text"
            }`}
          >
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1.5 text-xs text-secondary-text">
          <span
            className={`font-semibold ${
              trend.isPositive ? "text-success-green" : "text-danger-red"
            }`}
          >
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
          {trend.label && <span>{trend.label}</span>}
        </div>
      )}
    </Card>
  );
};
