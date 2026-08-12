import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        {label && (
          <label className="text-xs font-semibold text-secondary-text uppercase tracking-wider font-mono">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={`px-3 py-2 border border-border-color rounded-lg text-sm text-primary-text bg-white placeholder-secondary-text/50 focus:outline-none focus:ring-1 focus:ring-primary-blue focus:border-primary-blue transition-all disabled:bg-muted-bg disabled:text-secondary-text/80 ${
            error ? "border-danger-red focus:ring-danger-red focus:border-danger-red" : ""
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-danger-red mt-0.5">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
