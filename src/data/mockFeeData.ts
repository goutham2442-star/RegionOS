export interface FeeCollection {
  academicYear: string;
  totalTarget: number;
  totalCollected: number;
  breakdown: {
    category: string;
    target: number;
    collected: number;
  }[];
  recentTransactions: {
    id: string;
    studentName: string;
    rollNumber: string;
    amount: number;
    date: string;
    status: "Success" | "Pending" | "Failed";
  }[];
}

export const mockFeeData: Record<string, FeeCollection> = {
  rgu: {
    academicYear: "2025-2026",
    totalTarget: 5400000,
    totalCollected: 4779000, // ~88.5%
    breakdown: [
      { category: "Tuition Fees", target: 4000000, collected: 3600000 },
      { category: "Library & Lab Fees", target: 800000, collected: 720000 },
      { category: "Sports & Activities", target: 300000, collected: 270000 },
      { category: "Hostel & Dining", target: 300000, collected: 189000 },
    ],
    recentTransactions: [
      { id: "TXN-101", studentName: "Alice Smith", rollNumber: "RGU-2024-001", amount: 4500, date: "2026-08-11", status: "Success" },
      { id: "TXN-102", studentName: "Bob Jones", rollNumber: "RGU-2024-042", amount: 3200, date: "2026-08-10", status: "Success" },
      { id: "TXN-103", studentName: "Charlie Miller", rollNumber: "RGU-2023-112", amount: 1500, date: "2026-08-09", status: "Pending" },
      { id: "TXN-104", studentName: "Diana Prince", rollNumber: "RGU-2025-089", amount: 5000, date: "2026-08-08", status: "Success" },
      { id: "TXN-105", studentName: "Ethan Hunt", rollNumber: "RGU-2024-177", amount: 4500, date: "2026-08-07", status: "Failed" },
    ]
  },
  rgus: {
    academicYear: "2025-2026",
    totalTarget: 2200000,
    totalCollected: 2006400, // ~91.2%
    breakdown: [
      { category: "Tuition Fees", target: 1700000, collected: 1580000 },
      { category: "Library & Lab Fees", target: 300000, collected: 276400 },
      { category: "Sports & Activities", target: 200000, collected: 150000 },
    ],
    recentTransactions: [
      { id: "TXN-201", studentName: "Fiona Gallagher", rollNumber: "RGUS-2024-012", amount: 3500, date: "2026-08-10", status: "Success" },
      { id: "TXN-202", studentName: "George Bluth", rollNumber: "RGUS-2025-098", amount: 4200, date: "2026-08-08", status: "Success" },
    ]
  },
  rgue: {
    academicYear: "2025-2026",
    totalTarget: 1500000,
    totalCollected: 1251000, // ~83.4%
    breakdown: [
      { category: "Tuition Fees", target: 1200000, collected: 1020000 },
      { category: "Library & Lab Fees", target: 200000, collected: 171000 },
      { category: "Sports & Activities", target: 100000, collected: 60000 },
    ],
    recentTransactions: [
      { id: "TXN-301", studentName: "Harry Potter", rollNumber: "RGUE-2025-001", amount: 2500, date: "2026-08-09", status: "Success" }
    ]
  }
};
