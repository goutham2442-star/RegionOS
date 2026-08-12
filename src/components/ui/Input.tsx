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
          className={`regionos-input ${
            error ? "regionos-input-error" : ""
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-danger-red mt-0.5">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
