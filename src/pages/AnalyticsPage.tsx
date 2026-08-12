import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Select } from "../components/ui/Select";
import { Loader2, TrendingUp, Users, AlertCircle, Award } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const mockEnrollmentTrends = [
  { year: "2021 Sem 1", students: 1800 },
  { year: "2021 Sem 2", students: 1950 },
  { year: "2022 Sem 1", students: 2100 },
  { year: "2022 Sem 2", students: 2050 },
  { year: "2023 Sem 1", students: 2200 },
  { year: "2023 Sem 2", students: 2350 },
  { year: "2024 Sem 1", students: 2450 }, // 2450
];

const mockFeeRealization = [
  { week: "Wk 1", actual: 10, target: 15 },
  { week: "Wk 3", actual: 30, target: 35 },
  { week: "Wk 5", actual: 55, target: 50 },
  { week: "Wk 7", actual: 72, target: 70 },
  { week: "Wk 9", actual: 84, target: 80 },
];

export const AnalyticsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [semester, setSemester] = useState("FALL '25");

  useEffect(() => {
    // Simulate loading for the mock Power BI Workspace container
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppShell>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between text-left gap-4 pb-4 border-b border-border-color">
        <div>
          <h1 className="text-2xl font-bold text-primary-text tracking-tight m-0">
            Power BI Dashboard
          </h1>
          <p className="text-sm text-secondary-text mt-1">
            Campus performance analytics
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Status Dot Indicator */}
          <div className="flex items-center gap-2 bg-primary-blue/5 border border-primary-blue/15 px-3 py-1.5 rounded-full select-none">
            <span className="w-2.5 h-2.5 bg-primary-blue rounded-full animate-ping" />
            <span className="text-[10px] font-bold text-primary-blue uppercase tracking-widest font-mono">
              LIVE VIEW ACTIVE
            </span>
          </div>

          <Button variant="secondary" size="sm" onClick={() => navigate(`/campus/${id}`)}>
            Back to Overview
          </Button>
        </div>
      </div>

      {/* 1. Large Power BI Embedded Container */}
      <Card className="text-center p-8 bg-white overflow-hidden relative">
        <div className="h-64 flex flex-col justify-center items-center">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-primary-blue animate-spin" />
              <h3 className="text-sm font-semibold text-primary-text font-mono">
                Loading Power BI Report Model...
              </h3>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 select-none">
              <div className="w-12 h-12 bg-primary-blue/15 rounded-full flex items-center justify-center text-primary-blue mb-2">
                <Loader2 className="w-5 h-5 text-primary-blue" />
              </div>
              <h3 className="text-base font-bold text-primary-text m-0">
                Analytics workspace ready for integration
              </h3>
              <p className="text-xs text-secondary-text max-w-md mt-1.5 leading-relaxed">
                This container is pre-configured to host the custom RGU Campus metrics layout. Power BI token binding parameters will be established in the next development cycle.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Grid containing trends and performance scorecards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        
        {/* Enrollment Trends Chart */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <CardHeader>
            <div>
              <CardTitle>Enrollment Trends</CardTitle>
              <span className="text-[10px] text-secondary-text font-medium mt-0.5 block">
                YoY Growth by Semester
              </span>
            </div>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockEnrollmentTrends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1465D8" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1465D8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="year" stroke="#667085" fontSize={10} tick={{ fontFamily: 'monospace' }} />
                <YAxis stroke="#667085" fontSize={10} tick={{ fontFamily: 'monospace' }} />
                <Tooltip formatter={(value) => [`${value} Students`, "Enrollment"]} />
                <Area type="monotone" dataKey="students" stroke="#1465D8" strokeWidth={2} fillOpacity={1} fill="url(#colorEnroll)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Circular Donut Placement Rate Card */}
        <Card className="flex flex-col justify-between items-center text-center p-6">
          <CardHeader className="w-full text-left">
            <div>
              <CardTitle>Placement Rate</CardTitle>
              <span className="text-[10px] text-secondary-text font-medium mt-0.5 block">
                Class of 2024
              </span>
            </div>
          </CardHeader>
          
          <CardContent className="py-4">
            {/* SVG Circular Progress Ring (Pixel Perfect Donut Chart) */}
            <div className="relative flex items-center justify-center w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Grey track */}
                <circle cx="50" cy="50" r="40" stroke="#F3F4F6" strokeWidth="8" fill="transparent" />
                {/* Blue progress segment (85% of circumference 251.2) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#1465D8"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - 0.85)}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              {/* Central Text overlay */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-bold tracking-tight text-primary-text">85%</span>
                <span className="text-[9px] font-bold text-secondary-text font-mono uppercase tracking-widest mt-0.5">PLACED</span>
              </div>
            </div>
          </CardContent>

          <div className="text-xs text-secondary-text mt-2 font-mono uppercase tracking-wider">
            Target threshold: 80%
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Fee Collection Analytics Area Chart */}
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <CardHeader>
            <div>
              <CardTitle>Fee Collection</CardTitle>
              <span className="text-[10px] text-secondary-text font-medium mt-0.5 block">
                Q3 Realization vs Target
              </span>
            </div>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockFeeRealization} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1465D8" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1465D8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="week" stroke="#667085" fontSize={10} tick={{ fontFamily: 'monospace' }} />
                <YAxis stroke="#667085" fontSize={10} tick={{ fontFamily: 'monospace' }} />
                <Tooltip formatter={(value) => [`₹${value} L`, "Amount"]} />
                <Area type="monotone" dataKey="actual" name="Collected" stroke="#1465D8" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="target" name="Target" stroke="#9ca3af" strokeWidth={1} strokeDasharray="4 4" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Student Performance Scorecard Card */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Student Performance</CardTitle>
              <span className="text-[10px] text-secondary-text font-medium mt-0.5 block">
                Executive Compliance Metrics
              </span>
            </div>
            
            {/* Semester Selector */}
            <div className="w-28 flex-shrink-0">
              <Select
                options={[
                  { value: "FALL '25", label: "FALL '25" },
                  { value: "SPRING '25", label: "SPRING '25" },
                ]}
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="py-1 text-xs"
              />
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 mt-2">
            {/* Average GPA row */}
            <div className="flex items-center justify-between pb-3 border-b border-border-color">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary-blue" />
                <span className="text-xs font-semibold text-primary-text">Average GPA</span>
              </div>
              <span className="text-sm font-bold text-primary-text font-mono">8.4 / 10</span>
            </div>

            {/* Attendance row */}
            <div className="flex items-center justify-between pb-3 border-b border-border-color">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary-text" />
                <span className="text-xs font-semibold text-primary-text">Attendance</span>
              </div>
              <span className="text-sm font-bold text-primary-text font-mono">91.2%</span>
            </div>

            {/* Pass Rate row */}
            <div className="flex items-center justify-between pb-3 border-b border-border-color">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success-green" />
                <span className="text-xs font-semibold text-primary-text">Pass Rate</span>
              </div>
              <span className="text-sm font-bold text-success-green font-mono">96.4%</span>
            </div>

            {/* Students at risk row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-danger-red" />
                <span className="text-xs font-semibold text-primary-text">Students at Risk</span>
              </div>
              <span className="text-sm font-bold text-danger-red font-mono">14</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};
