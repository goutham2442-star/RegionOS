import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegionOSLogo } from "../components/brand/RegionOSLogo";

export const Splash: React.FC = () => {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Subtle entry animation
    setTimeout(() => setFade(true), 100);

    // Auto-transition to login after 1.8 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-white transition-opacity duration-700 select-none ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Logo and Wordmark centered */}
        <RegionOSLogo variant="light" size="lg" showText={false} />
        <div className="flex flex-col items-center gap-1 mt-2">
          <h1 className="text-3xl font-bold tracking-tight text-dark-navy font-sans m-0">
            Region<span className="text-primary-blue">OS</span>
          </h1>
          <p className="text-xs font-semibold text-secondary-text uppercase tracking-widest font-mono mt-1">
            Regional University Governance Platform
          </p>
        </div>
      </div>
    </div>
  );
};
