import { mockPlacementData } from "../data/mockPlacementData";
import type { PlacementStats } from "../data/mockPlacementData";

export const placementService = {
  getPlacementStatsByCampus: async (campusId: string): Promise<PlacementStats | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPlacementData[campusId]);
      }, 150);
    });
  }
};
