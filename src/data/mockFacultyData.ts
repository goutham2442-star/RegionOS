export interface FacultyMember {
  id: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  joiningYear: string;
  status: "Active" | "On Leave" | "Retired";
}

export const mockFacultyData: Record<string, FacultyMember[]> = {
  rgu: [
    {
      id: "fac-1",
      name: "Dr. Eleanor Vance",
      department: "Governance & Law",
      designation: "Dean & Professor",
      email: "e.vance@rgu.edu",
      joiningYear: "2005",
      status: "Active",
    },
    {
      id: "fac-2",
      name: "Prof. Marcus Brody",
      department: "Archaeology & History",
      designation: "Head of Department",
      email: "m.brody@rgu.edu",
      joiningYear: "1994",
      status: "Active",
    },
    {
      id: "fac-3",
      name: "Dr. Henry Jones Jr.",
      department: "Archaeology & History",
      designation: "Professor",
      email: "h.jones@rgu.edu",
      joiningYear: "1999",
      status: "On Leave",
    },
    {
      id: "fac-4",
      name: "Dr. Irene Adler",
      department: "Criminology & Public Policy",
      designation: "Associate Professor",
      email: "i.adler@rgu.edu",
      joiningYear: "2012",
      status: "Active",
    },
    {
      id: "fac-5",
      name: "Prof. Charles Xavier",
      department: "Genetics & Humanities",
      designation: "Professor Emeritus",
      email: "c.xavier@rgu.edu",
      joiningYear: "1988",
      status: "Active",
    }
  ],
  rgus: [
    {
      id: "fac-6",
      name: "Dr. Arthur Pendelton",
      department: "Maritime Policy",
      designation: "Dean",
      email: "a.pendelton@rgu.edu",
      joiningYear: "2008",
      status: "Active",
    },
    {
      id: "fac-7",
      name: "Dr. Bruce Banner",
      department: "Biophysics",
      designation: "Professor",
      email: "b.banner@rgu.edu",
      joiningYear: "2015",
      status: "Active",
    }
  ],
  rgue: [
    {
      id: "fac-8",
      name: "Dr. Sarah Jenkins",
      department: "Agricultural Governance",
      designation: "Dean",
      email: "s.jenkins@rgu.edu",
      joiningYear: "2011",
      status: "Active",
    }
  ]
};
