import { mockFacultyData } from "../data/mockFacultyData";
import type { FacultyMember } from "../data/mockFacultyData";

export const facultyService = {
  getFacultyByCampus: async (campusId: string): Promise<FacultyMember[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockFacultyData[campusId] || []);
      }, 150);
    });
  }
};
