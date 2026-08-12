export interface PlacementStats {
  academicYear: string;
  eligibleStudents: number;
  placedStudents: number;
  averageLPA: number;
  highestLPA: number;
  companiesVisited: number;
  topRecruiters: { name: string; count: number }[];
  breakdownByDepartment: {
    department: string;
    eligible: number;
    placed: number;
  }[];
}

export const mockPlacementData: Record<string, PlacementStats> = {
  rgu: {
    academicYear: "2025-2026",
    eligibleStudents: 320,
    placedStudents: 296, // ~92.5% (approx 92.4%)
    averageLPA: 8.4,
    highestLPA: 24.0,
    companiesVisited: 48,
    topRecruiters: [
      { name: "Apex Governance Solutions", count: 24 },
      { name: "Sovereign Consulting", count: 18 },
      { name: "Federal Tech Corp", count: 15 },
      { name: "Civic Systems Ltd", count: 12 },
    ],
    breakdownByDepartment: [
      { department: "Governance & Law", eligible: 110, placed: 104 },
      { department: "Criminology & Public Policy", eligible: 90, placed: 85 },
      { department: "Archaeology & History", eligible: 50, placed: 42 },
      { department: "Genetics & Humanities", eligible: 70, placed: 65 },
    ]
  },
  rgus: {
    academicYear: "2025-2026",
    eligibleStudents: 180,
    placedStudents: 153, // ~85%
    averageLPA: 6.2,
    highestLPA: 14.5,
    companiesVisited: 26,
    topRecruiters: [
      { name: "Coastal Shipping Group", count: 14 },
      { name: "Marine Tech Corp", count: 10 },
    ],
    breakdownByDepartment: [
      { department: "Maritime Policy", eligible: 100, placed: 88 },
      { department: "Biophysics", eligible: 80, placed: 65 },
    ]
  },
  rgue: {
    academicYear: "2025-2026",
    eligibleStudents: 120,
    placedStudents: 106, // ~88.2%
    averageLPA: 5.8,
    highestLPA: 12.0,
    companiesVisited: 18,
    topRecruiters: [
      { name: "AgriTech Innovators", count: 20 },
      { name: "Eco Solutions", count: 8 },
    ],
    breakdownByDepartment: [
      { department: "Agricultural Governance", eligible: 120, placed: 106 },
    ]
  }
};
