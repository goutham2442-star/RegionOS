import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { Card } from "../components/ui/Card";
import { MetricCard } from "../components/ui/MetricCard";
import { campusService } from "../services/campusService";
import type { Campus } from "../data/mockCampusData";
import {
  Users,
  Briefcase,
  CreditCard,
  Layers,
  ArrowRight,
  UserCheck,
  LineChart,
} from "lucide-react";

export const CampusDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campus, setCampus] = useState<Campus | null>(null);

  useEffect(() => {
    if (!id) return;
    campusService.getCampusById(id).then((c) => {
      if (c) {
        setCampus(c);
      } else {
        navigate("/campus");
      }
    });
  }, [id, navigate]);

  if (!campus) {
    return (
      <AppShell>
        <div className="text-center py-12">Loading campus console...</div>
      </AppShell>
    );
  }

  // Define module cards with link actions
  const modules = [
    {
      title: "Faculty",
      description: "Manage academic staff and resources.",
      path: `/campus/${id}/faculty`,
      icon: UserCheck,
    },
    {
      title: "Power BI Dashboard",
      description: "In-depth analytics and institutional metrics.",
      path: `/campus/${id}/analytics`,
      icon: LineChart,
    },
    {
      title: "Courses",
      description: "Curriculum planning and program tracking.",
      path: null, // placeholder
      icon: Layers,
    },
    {
      title: "Fees Collection",
      description: "Financial overview and student accounts.",
      path: `/campus/${id}/fees`,
      icon: CreditCard,
    },
    {
      title: "Number of Students",
      description: "Demographics and enrollment trends.",
      path: null, // placeholder
      icon: Users,
    },
    {
      title: "Placement Records",
      description: "Career services and alumni success data.",
      path: `/campus/${id}/placements`,
      icon: Briefcase,
    },
  ];

  return (
    <AppShell>
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between text-left gap-4 pb-4 border-b border-border-color">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-dark-navy text-white rounded-xl flex items-center justify-center font-bold font-mono">
            {campus.code.split("-")[1] || "CP"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary-text tracking-tight m-0">
              {campus.name}
            </h1>
            <p className="text-sm text-secondary-text mt-1">Campus Overview</p>
          </div>
        </div>
      </div>

      {/* Campus KPI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          label="TOTAL STUDENTS"
          value="2,450"
          icon={<Users className="w-4 h-4" />}
        />
        <MetricCard
          label="TOTAL FACULTY"
          value="180"
          icon={<UserCheck className="w-4 h-4" />}
        />
        <MetricCard
          label="TOTAL COURSES"
          value="45"
          icon={<Layers className="w-4 h-4" />}
        />
        <MetricCard
          label="PLACEMENT %"
          value="76.75%"
          icon={<Briefcase className="w-4 h-4" />}
          trend={{ value: 2.4, isPositive: true, label: "from target" }}
        />
        <MetricCard
          label="FEES COLLECTION %"
          value="84%"
          icon={<CreditCard className="w-4 h-4" />}
          trend={{ value: 1.8, isPositive: true, label: "from target" }}
          highlighted={true}
        />
      </div>

      {/* Modules Grid */}
      <div className="text-left mt-4">
        <h2 className="text-base font-bold text-primary-text uppercase tracking-wider font-mono mb-4">
          Campus Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <Card
              key={mod.title}
              onClick={mod.path ? () => navigate(mod.path!) : undefined}
              className={`flex flex-col justify-between p-6 ${
                mod.path
                  ? "cursor-pointer hover:border-primary-blue/30"
                  : "opacity-60 bg-[#F9FAFB] border-dashed border-border-color cursor-default"
              }`}
            >
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-lg ${
                      mod.path ? "bg-primary-blue/10 text-primary-blue" : "bg-muted-bg text-secondary-text"
                    }`}
                  >
                    <mod.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-primary-text m-0">
                    {mod.title}
                  </h3>
                </div>
                <p className="text-xs text-secondary-text mt-3 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs font-semibold text-secondary-text font-mono tracking-wider">
                {mod.path ? (
                  <>
                    <span className="text-primary-blue">ACTIVE CONSOLE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary-blue" />
                  </>
                ) : (
                  <span>FUTURE MODULE</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
};
