import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { MetricCard } from "../components/ui/MetricCard";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertCircle,
  FileSpreadsheet,
  CheckCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";

interface PendingAction {
  name: string;
  idNumber: string;
  course: string;
  pendingAmount: string;
}

const mockPendingActions: PendingAction[] = [
  { name: "Anaya Sharma", idNumber: "RGU/2024/010", course: "B.Tech CSE", pendingAmount: "₹1,25,000" },
  { name: "Priya Patel", idNumber: "RGU/2024/009", course: "MBA Finance", pendingAmount: "₹85,000" },
  { name: "Rohan Singh", idNumber: "RGU/2024/012", course: "BBA", pendingAmount: "₹40,000" },
];

const mockMonthlyTrend = [
  { month: "Jun", amount: 20 },
  { month: "Jul", amount: 45 },
  { month: "Aug", amount: 75 },
  { month: "Sep", amount: 110 },
  { month: "Oct", amount: 145 },
  { month: "Nov", amount: 180 },
  { month: "Dec", amount: 210 }, // 2.10 Cr
];

const mockCourseData = [
  { name: "B.Tech", collected: 120 },
  { name: "MBA", collected: 50 },
  { name: "BBA", collected: 30 },
  { name: "M.Tech", collected: 10 },
];

export const FeesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [toast, setToast] = useState<string | null>(null);

  const triggerReminder = (studentName: string) => {
    setToast(`Reminder queued successfully for ${studentName}.`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AppShell>
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B162B] text-white border border-[#1e293b] px-4 py-3 rounded-lg flex items-center gap-2.5 shadow-lg animate-bounce text-xs font-semibold font-mono tracking-wide select-none">
          <CheckCircle className="w-4 h-4 text-success-green" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between text-left gap-4 pb-4 border-b border-border-color">
        <div>
          <h1 className="text-2xl font-bold text-primary-text tracking-tight m-0">
            Fees Collection
          </h1>
          <p className="text-sm text-secondary-text mt-1">
            Executive fee collection dashboard
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => navigate(`/campus/${id}`)}>
          Back to Overview
        </Button>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="TOTAL FEES"
          value="₹2.50 Cr"
          icon={<CreditCard className="w-4 h-4" />}
        />
        <MetricCard
          label="COLLECTED"
          value="₹2.10 Cr"
          icon={<DollarSign className="w-4 h-4" />}
        />
        <MetricCard
          label="PENDING"
          value="₹40 L"
          icon={<AlertCircle className="w-4 h-4" />}
        />
        
        {/* Navy Highlighted Collection Rate Card */}
        <Card className="bg-dark-navy border-0 text-left p-6 flex flex-col justify-between shadow-md">
          <div className="flex items-start justify-between text-white">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest font-mono">
                COLLECTION RATE
              </span>
              <span className="text-3xl font-bold tracking-tight mt-1">84%</span>
            </div>
            <div className="text-white/60 p-2 rounded-lg bg-white/5">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xs text-[#9CA3AF] font-semibold font-mono uppercase tracking-wider mt-4">
            Target 90%
          </div>
        </Card>
      </div>

      {/* Overall Progress Section */}
      <Card className="text-left">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-sm font-bold text-primary-text m-0">
              Overall Collection Progress
            </h3>
            <span className="text-xs text-secondary-text">
              Target alignment progress for current fiscal year
            </span>
          </div>

          <div className="w-full md:w-96 flex items-center gap-6">
            <ProgressBar value={84} color="blue" showPercentage={false} />
            <span className="text-xs font-semibold text-secondary-text font-mono tracking-wider">
              FY 2023–24
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
        {/* Monthly Collection Trends Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Collection Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockMonthlyTrend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1465D8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1465D8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#667085" fontSize={11} tick={{ fontFamily: 'monospace' }} />
                <YAxis stroke="#667085" fontSize={11} tick={{ fontFamily: 'monospace' }} />
                <Tooltip formatter={(value) => [`₹${value} L`, "Amount"]} />
                <Area type="monotone" dataKey="amount" stroke="#1465D8" strokeWidth={2} fillOpacity={1} fill="url(#colorFees)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course-wise Collection Horizontal Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Course-wise Collection</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCourseData} layout="vertical" margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" stroke="#667085" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#667085" fontSize={11} />
                <Tooltip formatter={(value) => [`₹${value} L`, "Collected"]} />
                <Bar dataKey="collected" fill="#1465D8" radius={[0, 4, 4, 0]}>
                  {mockCourseData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#1465D8" : "#3b82f6"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pending Fees Table */}
      <Card className="text-left">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>Pending Fees Actions</CardTitle>
            <Button variant="secondary" size="sm" className="flex items-center gap-1.5 py-1">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-color text-xs font-bold text-secondary-text uppercase tracking-wider font-mono">
                  <th className="pb-3">Student Name</th>
                  <th className="pb-3">ID Number</th>
                  <th className="pb-3">Course</th>
                  <th className="pb-3">Amount Pending</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockPendingActions.map((rec) => (
                  <tr
                    key={rec.idNumber}
                    className="border-b border-border-color last:border-0 hover:bg-muted-bg/30 transition-colors"
                  >
                    <td className="py-4 text-sm font-bold text-primary-text">
                      {rec.name}
                    </td>
                    <td className="py-4 text-sm text-secondary-text font-mono uppercase tracking-wider">
                      {rec.idNumber}
                    </td>
                    <td className="py-4 text-sm text-secondary-text">
                      {rec.course}
                    </td>
                    <td className="py-4 text-sm font-bold text-danger-red font-mono">
                      {rec.pendingAmount}
                    </td>
                    <td className="py-4 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => triggerReminder(rec.name)}
                        className="py-1 px-3 border border-border-color hover:bg-primary-blue hover:text-white hover:border-transparent transition-all cursor-pointer text-xs"
                      >
                        Send Reminder
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
};
