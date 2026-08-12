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
          className={`regionos-input cursor-pointer ${
            error ? "regionos-input-error" : ""
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
