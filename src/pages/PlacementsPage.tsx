import React from "react";
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

  return (
    <AppShell>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="TOTAL STUDENTS"
          value="2,450"
          icon={<Users className="w-4 h-4" />}
        />
        <MetricCard
          label="ELIGIBLE"
          value="1,850"
          icon={<Briefcase className="w-4 h-4" />}
        />
        <MetricCard
          label="PLACED"
          value="1,420"
          icon={<GraduationCap className="w-4 h-4" />}
          trend={{ value: 4.8, isPositive: true, label: "from last batch" }}
        />
        <MetricCard
          label="PLACEMENT RATE"
          value="76.75%"
          icon={<Trophy className="w-4 h-4" />}
          trend={{ value: 3.2, isPositive: true, label: "from last batch" }}
          highlighted={true}
        />
      </div>

      {/* Main Grid: Course table & Recruiters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Table Container */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle>Course-wise Placement Records</CardTitle>
              <Button variant="secondary" size="sm" className="flex items-center gap-1.5 py-1 text-xs">
                <Download className="w-3.5 h-3.5" /> EXPORT CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-color text-xs font-bold text-secondary-text uppercase tracking-wider font-mono">
                    <th className="pb-3">Course</th>
                    <th className="pb-3 text-right">Students</th>
                    <th className="pb-3 text-right">Eligible</th>
                    <th className="pb-3 text-right">Placed</th>
                    <th className="pb-3 text-right">Placement %</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPlacementRows.map((row) => (
                    <tr
                      key={row.course}
                      className="border-b border-border-color last:border-0 hover:bg-muted-bg/30 transition-colors"
                    >
                      <td className="py-4 text-sm font-bold text-primary-text">
                        {row.course}
                      </td>
                      <td className="py-4 text-sm text-secondary-text text-right font-mono">
                        {row.students}
                      </td>
                      <td className="py-4 text-sm text-secondary-text text-right font-mono">
                        {row.eligible}
                      </td>
                      <td className="py-4 text-sm text-primary-text font-semibold text-right font-mono">
                        {row.placed}
                      </td>
                      <td className="py-4 text-right">
                        <Badge variant={parseFloat(row.rate) > 80 ? "success" : "info"} className="font-mono font-semibold">
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
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Top Recruiting Companies</CardTitle>
              <span className="text-[10px] text-secondary-text font-medium mt-1 block">
                Based on offers extended
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {mockTopRecruiters.map((rec) => (
              <div
                key={rec.initials}
                className="flex items-center justify-between p-3 border border-border-color rounded-xl hover:border-primary-blue/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  {/* Text-based company badge */}
                  <div className="w-10 h-10 rounded-lg bg-dark-navy text-white font-mono font-bold flex items-center justify-center text-xs">
                    {rec.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-primary-text leading-tight">
                      {rec.name}
                    </span>
                    <span className="text-[10px] text-secondary-text mt-0.5">
                      Recruitment Partner
                    </span>
                  </div>
                </div>
                <Badge variant="success" className="font-mono">
                  {rec.offers}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};
