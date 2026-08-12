import { mockCampusData } from "../data/mockCampusData";
import type { Campus } from "../data/mockCampusData";

export const campusService = {
  getCampuses: async (): Promise<Campus[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCampusData), 200);
    });
  },

  getCampusById: async (id: string): Promise<Campus | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const campus = mockCampusData.find((c) => c.id === id);
        resolve(campus);
      }, 150);
    });
  }
};
