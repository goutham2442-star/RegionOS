import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Search } from "lucide-react";

interface FacultyRecord {
  name: string;
  email: string;
  department: string;
  designation: string;
  role: string;
  responsibility: string;
  status: "ACTIVE" | "INACTIVE" | "ON LEAVE";
}

const mockFacultyRecords: FacultyRecord[] = [
  {
    name: "Dr. Eleanor Vance",
    email: "e.vance@rgu.edu",
    department: "Computer Science",
    designation: "Professor",
    role: "Head of AI Research",
    responsibility: "Curriculum Development, Graduate Super...",
    status: "ACTIVE",
  },
  {
    name: "Dr. Marcus Reed",
    email: "m.reed@rgu.edu",
    department: "Business Administration",
    designation: "Associate Prof.",
    role: "Undergraduate Advisor",
    responsibility: "Finance Core Courses, Internship Placem...",
    status: "ACTIVE",
  },
  {
    name: "Dr. Julian Bakir",
    email: "j.bakir@rgu.edu",
    department: "Bio-Engineering",
    designation: "Assistant Prof.",
    role: "Lab Director",
    responsibility: "Genetics Research, Grant Writing",
    status: "INACTIVE",
  },
  {
    name: "Prof. Sarah Lin",
    email: "s.lin@rgu.edu",
    department: "Architecture",
    designation: "Professor",
    role: "Dean of Studies",
    responsibility: "Urban Planning Seminars, Faculty Mentor...",
    status: "ACTIVE",
  },
  {
    name: "Dr. Arthur Pendleton",
    email: "a.pendleton@rgu.edu",
    department: "History",
    designation: "Professor Emeritus",
    role: "Guest Lecturer",
    responsibility: "Special Seminars, Archival Research",
    status: "ON LEAVE",
  },
];

export const FacultyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [desigFilter, setDesigFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  // Departments list for dropdown
  const depts = ["All", "Computer Science", "Business Administration", "Bio-Engineering", "Architecture", "History"];
  // Designations list for dropdown
  const desigs = ["All", "Professor", "Associate Prof.", "Assistant Prof.", "Professor Emeritus"];
  // Status list for dropdown
  const statuses = ["All", "ACTIVE", "INACTIVE", "ON LEAVE"];

  // Filtered and searched records
  const filteredRecords = useMemo(() => {
    return mockFacultyRecords.filter((rec) => {
      const matchesSearch =
        rec.name.toLowerCase().includes(search.toLowerCase()) ||
        rec.email.toLowerCase().includes(search.toLowerCase()) ||
        rec.role.toLowerCase().includes(search.toLowerCase());
      
      const matchesDept = deptFilter === "All" || rec.department === deptFilter;
      const matchesDesig = desigFilter === "All" || rec.designation === desigFilter;
      const matchesStatus = statusFilter === "All" || rec.status === statusFilter;

      return matchesSearch && matchesDept && matchesDesig && matchesStatus;
    });
  }, [search, deptFilter, desigFilter, statusFilter]);

  const displayedRecords = useMemo(() => {
    // Basic frontend pagination logic (max 5 items per page)
    const itemsPerPage = 5;
    const start = (page - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, page]);

  return (
    <AppShell>
      {/* Header Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between text-left gap-4 pb-4 border-b border-border-color">
        <div>
          <h1 className="text-2xl font-bold text-primary-text tracking-tight m-0">
            Faculty
          </h1>
          <p className="text-sm text-secondary-text mt-1">
            Faculty members working at {id?.toUpperCase() || "RGU"}
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => navigate(`/campus/${id}`)}>
          Back to Overview
        </Button>
      </div>

      {/* Filter and Search controls */}
      <Card className="text-left">
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 p-1">
          <div className="relative">
            <Search className="absolute right-3 top-9.5 w-4 h-4 text-secondary-text/60" />
            <Input
              label="Search Faculty"
              placeholder="Search faculty..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <Select
            label="Department"
            options={depts.map((d) => ({ value: d, label: d }))}
            value={deptFilter}
            onChange={(e) => {
              setDeptFilter(e.target.value);
              setPage(1);
            }}
          />

          <Select
            label="Designation"
            options={desigs.map((d) => ({ value: d, label: d }))}
            value={desigFilter}
            onChange={(e) => {
              setDesigFilter(e.target.value);
              setPage(1);
            }}
          />

          <Select
            label="Status"
            options={statuses.map((s) => ({ value: s, label: s }))}
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          />
        </CardContent>
      </Card>

      {/* Faculty Table Card */}
      <Card className="text-left">
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-color text-xs font-bold text-secondary-text uppercase tracking-wider font-mono">
                  <th className="pb-3">Faculty</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Designation</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Responsibility</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedRecords.length > 0 ? (
                  displayedRecords.map((rec) => (
                    <tr
                      key={rec.email}
                      className="border-b border-border-color last:border-0 hover:bg-muted-bg/30 transition-colors"
                    >
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-primary-text">
                            {rec.name}
                          </span>
                          <span className="text-xs text-secondary-text font-mono">
                            {rec.email}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-primary-text font-semibold">
                        {rec.department}
                      </td>
                      <td className="py-4 text-sm text-secondary-text">
                        {rec.designation}
                      </td>
                      <td className="py-4 text-sm text-secondary-text">
                        {rec.role}
                      </td>
                      <td className="py-4 text-sm text-secondary-text max-w-xs truncate">
                        {rec.responsibility}
                      </td>
                      <td className="py-4 text-right">
                        <Badge
                          variant={
                            rec.status === "ACTIVE"
                              ? "success"
                              : rec.status === "ON LEAVE"
                              ? "warning"
                              : "neutral"
                          }
                        >
                          {rec.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-secondary-text text-sm">
                      No faculty records match the search or filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer & Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border-color text-xs font-semibold text-secondary-text">
            <span>
              Showing {displayedRecords.length > 0 ? (page - 1) * 5 + 1 : 0} to{" "}
              {Math.min(page * 5, filteredRecords.length)} of {filteredRecords.length} faculty members (total database: 24)
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="py-1 cursor-pointer"
              >
                Prev
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={page * 5 >= filteredRecords.length}
                onClick={() => setPage(page + 1)}
                className="py-1 cursor-pointer"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
};
