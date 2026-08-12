import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        {label && (
          <label className="text-xs font-semibold text-secondary-text uppercase tracking-wider font-mono">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`px-3 py-2 border border-border-color rounded-lg text-sm text-primary-text bg-white focus:outline-none focus:ring-1 focus:ring-primary-blue focus:border-primary-blue transition-all disabled:bg-muted-bg disabled:text-secondary-text/80 cursor-pointer ${
            error ? "border-danger-red focus:ring-danger-red focus:border-danger-red" : ""
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-danger-red mt-0.5">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
