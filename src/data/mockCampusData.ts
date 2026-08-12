export interface Campus {
  id: string;
  name: string;
  code: string;
  established: string;
  location: string;
  totalStudents: number;
  totalFaculty: number;
  placementRate: number;
  feesCollectionRate: number;
  coursesCount: number;
  deanName: string;
  type: string;
}

export const mockCampusData: Campus[] = [
  {
    id: "rgu",
    name: "Royal Governance University",
    code: "RGU-MAIN",
    established: "1982",
    location: "Metro City Campus",
    totalStudents: 2450,
    totalFaculty: 180,
    placementRate: 92.4,
    feesCollectionRate: 88.5,
    coursesCount: 45,
    deanName: "Dr. Eleanor Vance",
    type: "Public University",
  },
  {
    id: "rgus",
    name: "RGU - Southern Campus",
    code: "RGU-SOUTH",
    established: "1998",
    location: "Coastal Hub",
    totalStudents: 1200,
    totalFaculty: 95,
    placementRate: 85.0,
    feesCollectionRate: 91.2,
    coursesCount: 22,
    deanName: "Dr. Arthur Pendelton",
    type: "Regional Affiliate",
  },
  {
    id: "rgue",
    name: "RGU - Eastern Campus",
    code: "RGU-EAST",
    established: "2010",
    location: "Hills Tech Zone",
    totalStudents: 850,
    totalFaculty: 64,
    placementRate: 88.2,
    feesCollectionRate: 83.4,
    coursesCount: 15,
    deanName: "Dr. Sarah Jenkins",
    type: "Extension Center",
  }
];
