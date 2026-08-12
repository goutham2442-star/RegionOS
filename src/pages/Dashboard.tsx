import React, { useEffect, useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { MetricCard } from "../components/ui/MetricCard";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { analyticsService } from "../services/analyticsService";
import type { RegionStats, ActivityLog } from "../data/mockDashboardData";
import { Building2, Users, Briefcase, CreditCard, Activity } from "lucide-react";

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<RegionStats | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  useEffect(() => {
    analyticsService.getDashboardStats().then((data) => setStats(data));
    analyticsService.getRecentActivities().then((data) => setActivities(data));
  }, []);

  return (
    <AppShell>
      {/* Header Context */}
      <div className="flex flex-col text-left">
        <h1 className="text-2xl font-semibold text-primary-text tracking-tight">
          Regional Administration Dashboard
        </h1>
        <p className="text-sm text-secondary-text mt-1">
          Overview of campus operations, finances, and academic placement performance.
        </p>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="TOTAL CAMPUSES"
          value={stats?.totalCampuses || "..."}
          icon={<Building2 className="w-4 h-4" />}
        />
        <MetricCard
          label="TOTAL ACTIVE STUDENTS"
          value={stats?.totalStudents ? stats.totalStudents.toLocaleString() : "..."}
          icon={<Users className="w-4 h-4" />}
        />
        <MetricCard
          label="PLACEMENT RATE"
          value={stats?.averagePlacementRate ? `${stats.averagePlacementRate}%` : "..."}
          icon={<Briefcase className="w-4 h-4" />}
          trend={{ value: 1.1, isPositive: true, label: "from last semester" }}
        />
        <MetricCard
          label="FEES COLLECTION RATE"
          value={stats?.averageFeesCollectionRate ? `${stats.averageFeesCollectionRate}%` : "..."}
          icon={<CreditCard className="w-4 h-4" />}
          trend={{ value: 0.8, isPositive: false, label: "from last semester" }}
          highlighted={true}
        />
      </div>

      {/* Main Grid: Visuals & Activities Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Summary Card */}
        <Card className="lg:col-span-2 text-left">
          <CardHeader>
            <CardTitle>Regional Operations & Trends</CardTitle>
            <Badge variant="info">Live Feed</Badge>
          </CardHeader>
          <CardContent className="h-64 flex flex-col justify-center items-center text-center bg-muted-bg/30 border border-border-color border-dashed rounded-lg p-6">
            <Activity className="w-8 h-8 text-secondary-text/60 animate-pulse mb-3" />
            <h4 className="text-sm font-semibold text-primary-text">
              Trend Metrics Pending Data Connection
            </h4>
            <p className="text-xs text-secondary-text max-w-sm mt-1">
              Visual charts and regression plots will be integrated in Part 2 of RegionOS deployment.
            </p>
          </CardContent>
        </Card>

        {/* Recent System Activities */}
        <Card className="text-left">
          <CardHeader>
            <CardTitle>Activity Ledger</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="flex flex-col gap-1 pb-3 border-b border-border-color last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-primary-text">
                      {act.campusName}
                    </span>
                    <span className="text-[10px] font-medium text-secondary-text">
                      {act.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-secondary-text">{act.action}</p>
                  <div className="flex items-center justify-between mt-1 text-[10px]">
                    <span className="text-secondary-text">By {act.user}</span>
                    <Badge
                      variant={
                        act.status === "Completed"
                          ? "success"
                          : act.status === "Pending"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {act.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};
