import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Helper to map paths to human readable labels
  const getLabel = (path: string) => {
    if (path === "rgu") return "RGU";
    if (path === "rgus") return "RGUS";
    if (path === "rgue") return "RGUE";
    
    // Capitalize first letter
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav className="flex items-center gap-1 text-xs text-secondary-text">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 hover:text-primary-blue transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const label = getLabel(value);

        // Don't show login/register in breadcrumbs if user gets there
        if (value === "login" || value === "register") return null;

        return (
          <div key={to} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3 text-border-color shrink-0" />
            {isLast ? (
              <span className="font-medium text-primary-text">{label}</span>
            ) : (
              <Link
                to={to}
                className="hover:text-primary-blue transition-colors"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
