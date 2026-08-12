import { mockFeeData } from "../data/mockFeeData";
import type { FeeCollection } from "../data/mockFeeData";

export const feeService = {
  getFeeStatsByCampus: async (campusId: string): Promise<FeeCollection | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockFeeData[campusId]);
      }, 150);
    });
  }
};
