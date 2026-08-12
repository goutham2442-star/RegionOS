import { mockDashboardData } from "../data/mockDashboardData";
import type { RegionStats, ActivityLog } from "../data/mockDashboardData";

export const analyticsService = {
  getDashboardStats: async (): Promise<RegionStats> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDashboardData.stats);
      }, 200);
    });
  },

  getTrendData: async (): Promise<{ name: string; placements: number; fees: number }[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDashboardData.trendData);
      }, 200);
    });
  },

  getRecentActivities: async (): Promise<ActivityLog[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDashboardData.recentActivities);
      }, 200);
    });
  }
};
