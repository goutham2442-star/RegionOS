import React from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Button } from "../components/ui/Button";
import { Calendar, Hourglass, Lock, ArrowRight } from "lucide-react";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppShell>
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between text-left gap-4 pb-4 border-b border-border-color">
        <div>
          <h1 className="text-2xl font-bold text-primary-text tracking-tight m-0">
            Good Morning, Regional Director
          </h1>
          <p className="text-sm text-secondary-text mt-1">
            Here's your regional overview.
          </p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2.5 px-3 py-2 bg-white border border-border-color rounded-lg text-xs font-semibold font-mono text-secondary-text shadow-sm select-none">
          <Calendar className="w-3.5 h-3.5" />
          <span>AUG 10, 2026</span>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Campus Card (Large, 2 cols) */}
        <Card className="lg:col-span-2 flex flex-col md:flex-row justify-between items-stretch gap-6 overflow-hidden p-0 relative">
          <div className="flex-1 flex flex-col justify-between p-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-primary-blue uppercase tracking-widest font-mono">
                Central Campus Module
              </span>
              <h2 className="text-2xl font-bold text-primary-text tracking-tight m-0">
                Campus
              </h2>
              <p className="text-sm text-secondary-text leading-relaxed mt-2 max-w-md">
                Monitor and manage all regional campus operations, facility statuses, and core infrastructure metrics in real-time.
              </p>
            </div>

            <div className="mt-8">
              <Button
                variant="blue"
                onClick={() => navigate("/campus")}
                className="flex items-center gap-2 px-5 py-2.5 font-semibold text-xs tracking-wider uppercase font-mono shadow-sm cursor-pointer"
              >
                Access Module <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Minimalist SVG Campus Art */}
          <div className="w-full md:w-64 bg-muted-bg border-t md:border-t-0 md:border-l border-border-color flex items-center justify-center p-8 select-none">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-32 h-32 text-secondary-text/30"
            >
              {/* Ground level */}
              <line x1="10" y1="85" x2="90" y2="85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              
              {/* Campus main building pillars */}
              <rect x="25" y="40" width="12" height="45" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <rect x="44" y="40" width="12" height="45" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <rect x="63" y="40" width="12" height="45" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              
              {/* Roof Triangle */}
              <path d="M 20 40 L 50 15 L 80 40 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
              
              {/* Windows/decorations */}
              <line x1="31" y1="50" x2="31" y2="75" stroke="currentColor" strokeWidth="1.5" />
              <line x1="50" y1="50" x2="50" y2="75" stroke="currentColor" strokeWidth="1.5" />
              <line x1="69" y1="50" x2="69" y2="75" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </Card>

        {/* Aligns Card */}
        <Card className="flex flex-col justify-between p-8">
          <div>
            <span className="text-[10px] font-bold text-primary-blue uppercase tracking-widest font-mono">
              Strategic Alignment
            </span>
            <h2 className="text-xl font-bold text-primary-text tracking-tight mt-1 mb-2">
              Aligns
            </h2>
            <p className="text-sm text-secondary-text leading-relaxed">
              Regional alignment tracking and strategic initiative oversight.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-border-color">
            <div className="flex justify-between items-center mb-1 text-xs font-semibold text-secondary-text">
              <span>Q3 Progress</span>
              <span className="font-mono text-primary-blue">71%</span>
            </div>
            <ProgressBar value={71} color="blue" showPercentage={false} />
          </div>
        </Card>
      </div>

      {/* Secondary Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* Awaiting Module Card 1 */}
        <Card className="bg-[#F8F9FA]/40 border-dashed p-8 flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="w-9 h-9 rounded-full bg-muted-bg text-secondary-text flex items-center justify-center">
              <Hourglass className="w-4 h-4 text-secondary-text/80 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-primary-text m-0">Awaiting...</h3>
              <p className="text-xs text-secondary-text mt-1">
                Module Pending Integration
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-secondary-text/60 tracking-wider font-mono mt-6">
            STG-3 INTEGRATION
          </span>
        </Card>

        {/* Awaiting Module Card 2 */}
        <Card className="bg-[#F8F9FA]/40 border-dashed p-8 flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="w-9 h-9 rounded-full bg-muted-bg text-secondary-text flex items-center justify-center">
              <Hourglass className="w-4 h-4 text-secondary-text/80 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-primary-text m-0">Awaiting...</h3>
              <p className="text-xs text-secondary-text mt-1">
                Module Pending Integration
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-secondary-text/60 tracking-wider font-mono mt-6">
            STG-3 INTEGRATION
          </span>
        </Card>

        {/* Data Governance Card (Subdued) */}
        <Card className="bg-[#F9FAFB] border-border-color p-8 flex flex-col justify-between opacity-80">
          <div className="flex flex-col gap-3">
            <div className="w-9 h-9 rounded-full bg-muted-bg text-secondary-text flex items-center justify-center">
              <Lock className="w-4 h-4 text-secondary-text/80" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-secondary-text m-0">
                Data Governance
              </h3>
              <p className="text-xs text-secondary-text mt-1">
                Awaiting clearance level
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-secondary-text/40 tracking-wider font-mono mt-6">
            SECURE MODULE
          </span>
        </Card>
      </div>
    </AppShell>
  );
};
