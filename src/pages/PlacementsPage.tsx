import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { MetricCard } from "../components/ui/MetricCard";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Users, GraduationCap, Briefcase, Download, Trophy } from "lucide-react";

interface PlacementRow {
  course: string;
  students: number;
  eligible: number;
  placed: number;
  rate: string;
}

const mockPlacementRows: PlacementRow[] = [
  { course: "B.Tech Computer Science", students: 450, eligible: 380, placed: 342, rate: "90.0%" },
  { course: "B.Tech Information Tech", students: 320, eligible: 290, placed: 255, rate: "87.9%" },
  { course: "MBA Finance", students: 180, eligible: 165, placed: 140, rate: "84.8%" },
  { course: "BBA Business Admin", students: 250, eligible: 210, placed: 130, rate: "61.9%" },
];

const mockTopRecruiters = [
  { initials: "TCS", name: "Tata Consultancy Services", offers: "145 Offers" },
  { initials: "INF", name: "Infosys", offers: "112 Offers" },
  { initials: "DEL", name: "Deloitte", offers: "82 Offers" },
];

export const PlacementsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);

  const handleExportCSV = () => {
    setToast("CSV export initiated successfully.");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AppShell>
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-dark-navy text-white border border-[#1e293b] px-4 py-3 rounded-lg flex items-center gap-2.5 shadow-lg animate-bounce text-xs font-semibold font-mono tracking-wide select-none">
          <GraduationCap className="w-4 h-4 text-success-green" />
          <span>{toast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between text-left gap-4 pb-4 border-b border-border-color">
        <div>
          <h1 className="text-2xl font-bold text-primary-text tracking-tight m-0">
            Placement Records
          </h1>
          <p className="text-sm text-secondary-text mt-1">
            Placement performance and recruitment statistics
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => navigate(`/campus/${id}`)}>
          Back to Overview
        </Button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="TOTAL STUDENTS"
          value="2,450"
          icon={<Users className="w-4 h-4" />}
        />
        <MetricCard
          label="ELIGIBLE"
          value="1,850"
          icon={<GraduationCap className="w-4 h-4" />}
        />
        <MetricCard
          label="PLACED"
          value="1,420"
          icon={<Briefcase className="w-4 h-4" />}
        />
        <MetricCard
          label="PLACEMENT RATE"
          value="76.75%"
          icon={<Trophy className="w-4 h-4 text-primary-blue" />}
          highlighted={true}
        />
      </div>

      {/* Main Grid: Course table & Recruiters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left items-start">
        {/* Table Container */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between w-full pb-2">
            <CardTitle>Course-wise Placement Records</CardTitle>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 py-1.5 text-xs font-mono tracking-wider uppercase cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> EXPORT CSV
            </Button>
          </CardHeader>
          <CardContent className="p-6 pt-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-border-color text-xs font-bold text-secondary-text uppercase tracking-wider font-mono">
                    <th className="pb-3 text-left">Course</th>
                    <th className="pb-3 text-right">Students</th>
                    <th className="pb-3 text-right">Eligible</th>
                    <th className="pb-3 text-right">Placed</th>
                    <th className="pb-3 text-right">Placement %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color">
                  {mockPlacementRows.map((row) => (
                    <tr key={row.course} className="hover:bg-muted-bg/30 transition-colors">
                      <td className="py-4 text-sm font-bold text-primary-text pr-4">
                        {row.course}
                      </td>
                      <td className="py-4 text-sm text-secondary-text text-right font-mono pr-4">
                        {row.students}
                      </td>
                      <td className="py-4 text-sm text-secondary-text text-right font-mono pr-4">
                        {row.eligible}
                      </td>
                      <td className="py-4 text-sm text-primary-text font-semibold text-right font-mono pr-4">
                        {row.placed}
                      </td>
                      <td className="py-4 text-right">
                        <Badge
                          variant={parseFloat(row.rate) >= 80 ? "success" : "warning"}
                          className="font-mono font-semibold"
                        >
                          {row.rate}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Top Recruiters Card */}
        <Card className="p-6">
          <CardHeader className="p-0 pb-4 border-b border-border-color">
            <CardTitle>Top Recruiting Companies</CardTitle>
            <span className="text-[10px] text-secondary-text font-bold font-mono uppercase tracking-wider mt-1 block">
              Based on offers extended
            </span>
          </CardHeader>
          <CardContent className="p-0 pt-4 flex flex-col gap-4">
            {mockTopRecruiters.map((rec) => (
              <div
                key={rec.initials}
                className="flex items-center justify-between py-3 border-b border-border-color last:border-0"
              >
                <div className="flex items-center gap-3">
                  {/* Company Initials Avatar Badge */}
                  <div className="w-10 h-10 rounded-lg bg-dark-navy text-white font-mono font-bold flex items-center justify-center text-xs shrink-0 select-none">
                    {rec.initials}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-primary-text leading-tight">
                      {rec.initials}
                    </span>
                    <span className="text-[10px] text-secondary-text mt-0.5">
                      {rec.name}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-primary-text font-mono uppercase tracking-wider">
                    {rec.offers}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Sync Footer */}
      <div className="w-full text-center py-6 border-t border-border-color mt-6 select-none">
        <p className="text-xs text-secondary-text font-semibold font-mono uppercase tracking-widest m-0">
          Data updated automatically from campus placement drive. Last sync: Today, 09:42 AM.
        </p>
      </div>
    </AppShell>
  );
};
