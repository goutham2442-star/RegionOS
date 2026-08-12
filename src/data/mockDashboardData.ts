export interface RegionStats {
  totalCampuses: number;
  totalStudents: number;
  totalFaculty: number;
  averagePlacementRate: number;
  averageFeesCollectionRate: number;
  activeRequests: number;
}

export interface ActivityLog {
  id: string;
  campusName: string;
  action: string;
  timestamp: string;
  user: string;
  status: "Completed" | "Pending" | "Flagged";
}

export const mockDashboardData = {
  stats: {
    totalCampuses: 3,
    totalStudents: 4500,
    totalFaculty: 339,
    averagePlacementRate: 88.5,
    averageFeesCollectionRate: 87.7,
    activeRequests: 14,
  } as RegionStats,
  
  trendData: [
    { name: "2021", placements: 82.5, fees: 80.1 },
    { name: "2022", placements: 84.8, fees: 82.3 },
    { name: "2023", placements: 86.1, fees: 85.0 },
    { name: "2024", placements: 87.4, fees: 86.9 },
    { name: "2025", placements: 88.5, fees: 87.7 },
  ],

  recentActivities: [
    {
      id: "act-101",
      campusName: "Royal Governance University",
      action: "Updated placement statistics for 2025-2026 Batch A",
      timestamp: "2 hours ago",
      user: "Dr. Eleanor Vance",
      status: "Completed",
    },
    {
      id: "act-102",
      campusName: "RGU - Southern Campus",
      action: "Submitted fee structure revision request for approval",
      timestamp: "5 hours ago",
      user: "Dr. Arthur Pendelton",
      status: "Pending",
    },
    {
      id: "act-103",
      campusName: "RGU - Eastern Campus",
      action: "Flagged low fee collections in agricultural science department",
      timestamp: "1 day ago",
      user: "Dr. Sarah Jenkins",
      status: "Flagged",
    },
    {
      id: "act-104",
      campusName: "Royal Governance University",
      action: "Added 4 new faculty members to genetics department",
      timestamp: "2 days ago",
      user: "Admin",
      status: "Completed",
    }
  ] as ActivityLog[]
};
