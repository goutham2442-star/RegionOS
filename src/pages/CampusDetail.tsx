import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { MetricCard } from "../components/ui/MetricCard";
import { ProgressBar } from "../components/ui/ProgressBar";
import { EmptyState } from "../components/ui/EmptyState";
import { campusService } from "../services/campusService";
import { facultyService } from "../services/facultyService";
import { feeService } from "../services/feeService";
import { placementService } from "../services/placementService";
import type { Campus } from "../data/mockCampusData";
import type { FacultyMember } from "../data/mockFacultyData";
import type { FeeCollection } from "../data/mockFeeData";
import type { PlacementStats } from "../data/mockPlacementData";
import {
  Users,
  GraduationCap,
  Briefcase,
  CreditCard,
  MapPin,
  TrendingUp,
} from "lucide-react";

export const CampusDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [campus, setCampus] = useState<Campus | null>(null);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [fees, setFees] = useState<FeeCollection | null>(null);
  const [placements, setPlacements] = useState<PlacementStats | null>(null);

  // Tab management based on path suffix
  const pathParts = location.pathname.split("/");
  const currentTab = pathParts[3] || "overview"; // overview, faculty, fees, placements, analytics

  useEffect(() => {
    if (!id) return;
    campusService.getCampusById(id).then((c) => {
      if (c) {
        setCampus(c);
      } else {
        navigate("/campus");
      }
    });

    facultyService.getFacultyByCampus(id).then(setFaculty);
    feeService.getFeeStatsByCampus(id).then((f) => setFees(f || null));
    placementService.getPlacementStatsByCampus(id).then((p) => setPlacements(p || null));
  }, [id, navigate]);

  if (!campus) {
    return (
      <AppShell>
        <div className="text-center py-12">Loading campus console...</div>
      </AppShell>
    );
  }

  const handleTabChange = (tab: string) => {
    if (tab === "overview") {
      navigate(`/campus/${id}`);
    } else {
      navigate(`/campus/${id}/${tab}`);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "faculty", label: "Faculty" },
    { id: "fees", label: "Fees & Finance" },
    { id: "placements", label: "Placements" },
    { id: "analytics", label: "Analytics" },
  ];

  return (
    <AppShell>
      {/* Header Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between text-left gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0B162B] text-white rounded-xl flex items-center justify-center font-bold font-mono">
            {campus.code.split("-")[1] || "CP"}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-primary-text tracking-tight">
              {campus.name}
            </h1>
            <div className="flex items-center gap-3 text-xs text-secondary-text mt-0.5">
              <span className="font-mono bg-muted-bg px-2 py-0.5 rounded font-semibold">
                {campus.code}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {campus.location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate("/campus")}>
            Back to List
          </Button>
          <Button variant="blue" size="sm">
            Export Report
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border-color flex gap-6 select-none overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              currentTab === tab.id
                ? "border-primary-blue text-primary-blue"
                : "border-transparent text-secondary-text hover:text-primary-text"
            }`}
          >
            {tab.id === "overview" && <span className="mr-1.5 font-mono text-[10px]">01</span>}
            {tab.id === "faculty" && <span className="mr-1.5 font-mono text-[10px]">02</span>}
            {tab.id === "fees" && <span className="mr-1.5 font-mono text-[10px]">03</span>}
            {tab.id === "placements" && <span className="mr-1.5 font-mono text-[10px]">04</span>}
            {tab.id === "analytics" && <span className="mr-1.5 font-mono text-[10px]">05</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="flex flex-col gap-6 text-left">
        {/* Tab 1: OVERVIEW */}
        {currentTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 flex flex-col gap-6">
              <CardHeader className="pb-2 border-0">
                <CardTitle>Campus Overview & Administration</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-secondary-text uppercase tracking-widest font-mono">
                    DEAN OF CAMPUS
                  </span>
                  <span className="text-base font-semibold text-primary-text">
                    {campus.deanName}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-secondary-text uppercase tracking-widest font-mono">
                    ESTABLISHED YEAR
                  </span>
                  <span className="text-base font-semibold text-primary-text">
                    {campus.established}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-secondary-text uppercase tracking-widest font-mono">
                    CAMPUS TYPE
                  </span>
                  <span className="text-base font-semibold text-primary-text">
                    {campus.type}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-secondary-text uppercase tracking-widest font-mono">
                    TOTAL COURSES OFFERED
                  </span>
                  <span className="text-base font-semibold text-primary-text font-mono">
                    {campus.coursesCount} Courses
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col gap-6">
              <CardHeader className="pb-2 border-0">
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-text">Audit Status</span>
                  <Badge variant="success">Approved</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-text">Last Inspected</span>
                  <span className="font-semibold text-primary-text">July 2026</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-text">Governance Score</span>
                  <span className="font-semibold text-primary-text">96 / 100</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 2: FACULTY */}
        {currentTab === "faculty" && (
          <Card>
            <CardHeader>
              <CardTitle>Faculty Roster ({faculty.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border-color text-xs font-semibold text-secondary-text uppercase tracking-wider font-mono">
                      <th className="pb-3 font-semibold">Name</th>
                      <th className="pb-3 font-semibold">Department</th>
                      <th className="pb-3 font-semibold">Designation</th>
                      <th className="pb-3 font-semibold">Contact</th>
                      <th className="pb-3 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faculty.map((member) => (
                      <tr
                        key={member.id}
                        className="border-b border-border-color last:border-0 hover:bg-muted-bg/30"
                      >
                        <td className="py-4 text-sm font-semibold text-primary-text">
                          {member.name}
                        </td>
                        <td className="py-4 text-sm text-secondary-text">
                          {member.department}
                        </td>
                        <td className="py-4 text-sm text-secondary-text">
                          {member.designation}
                        </td>
                        <td className="py-4 text-sm text-secondary-text">
                          {member.email}
                        </td>
                        <td className="py-4 text-sm text-right">
                          <Badge
                            variant={
                              member.status === "Active"
                                ? "success"
                                : member.status === "On Leave"
                                ? "warning"
                                : "neutral"
                            }
                          >
                            {member.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 3: FEES */}
        {currentTab === "fees" && fees && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricCard
                label="TOTAL FEE TARGET"
                value={`$${fees.totalTarget.toLocaleString()}`}
                icon={<CreditCard className="w-4 h-4" />}
              />
              <MetricCard
                label="TOTAL FEES COLLECTED"
                value={`$${fees.totalCollected.toLocaleString()}`}
                icon={<TrendingUp className="w-4 h-4" />}
                trend={{
                  value: campus.feesCollectionRate,
                  isPositive: campus.feesCollectionRate > 85,
                  label: "collection efficiency",
                }}
                highlighted={true}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Fees Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {fees.breakdown.map((item) => {
                    const percentage = (item.collected / item.target) * 100;
                    return (
                      <div key={item.category} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-primary-text">
                            {item.category}
                          </span>
                          <span className="text-secondary-text">
                            ${item.collected.toLocaleString()} / $
                            {item.target.toLocaleString()}
                          </span>
                        </div>
                        <ProgressBar value={percentage} color={percentage > 85 ? "green" : "blue"} />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Transactions list */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Fee Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {fees.recentTransactions.map((txn) => (
                      <div
                        key={txn.id}
                        className="flex items-center justify-between py-2 border-b border-border-color last:border-0 last:pb-0"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-primary-text">
                            {txn.studentName}
                          </span>
                          <span className="text-[10px] text-secondary-text font-mono uppercase tracking-wider">
                            {txn.rollNumber}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-primary-text">
                            ${txn.amount}
                          </span>
                          <Badge
                            variant={
                              txn.status === "Success"
                                ? "success"
                                : txn.status === "Pending"
                                ? "warning"
                                : "danger"
                            }
                          >
                            {txn.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Tab 4: PLACEMENTS */}
        {currentTab === "placements" && placements && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                label="ELIGIBLE STUDENTS"
                value={placements.eligibleStudents}
                icon={<Users className="w-4 h-4" />}
              />
              <MetricCard
                label="PLACED STUDENTS"
                value={placements.placedStudents}
                icon={<GraduationCap className="w-4 h-4" />}
                trend={{
                  value: campus.placementRate,
                  isPositive: campus.placementRate > 90,
                  label: "placement % achieved",
                }}
              />
              <MetricCard
                label="AVERAGE PACKAGE"
                value={`${placements.averageLPA} LPA`}
                icon={<Briefcase className="w-4 h-4" />}
                highlighted={true}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department placements */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Placement Ratio</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {placements.breakdownByDepartment.map((item) => {
                    const percentage = (item.placed / item.eligible) * 100;
                    return (
                      <div key={item.department} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-primary-text">
                            {item.department}
                          </span>
                          <span className="text-secondary-text">
                            {item.placed} / {item.eligible} Placed
                          </span>
                        </div>
                        <ProgressBar value={percentage} color={percentage > 90 ? "green" : "blue"} />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Recruiters list */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Recruiters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {placements.topRecruiters.map((rec) => (
                      <div
                        key={rec.name}
                        className="flex items-center justify-between py-2 border-b border-border-color last:border-0 last:pb-0"
                      >
                        <span className="text-sm font-semibold text-primary-text">
                          {rec.name}
                        </span>
                        <Badge variant="info">{rec.count} Hires</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Tab 5: ANALYTICS */}
        {currentTab === "analytics" && (
          <EmptyState
            title="Analytics Engine Pending Integration"
            description="Detailed campus performance analytics and interactive regression graphs will be available in Part 2."
          />
        )}
      </div>
    </AppShell>
  );
};
