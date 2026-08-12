import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { Card, CardContent } from "../components/ui/Card";
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

  // Filter Categories
  const depts = ["All", "Computer Science", "Business Administration", "Bio-Engineering", "Architecture", "History"];
  const desigs = ["All", "Professor", "Associate Prof.", "Assistant Prof.", "Professor Emeritus"];
  const statuses = ["All", "ACTIVE", "INACTIVE", "ON LEAVE"];

  // Filter logic
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

      {/* Filter and Search Bar Container */}
      <div className="bg-white border border-border-color rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-left">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text/60" />
          <input
            type="text"
            placeholder="Search faculty..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="regionos-input pl-9"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-secondary-text font-mono uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span>Department:</span>
            <select
              value={deptFilter}
              onChange={(e) => {
                setDeptFilter(e.target.value);
                setPage(1);
              }}
              className="regionos-input py-1.5 px-3 cursor-pointer w-auto min-w-[120px]"
            >
              {depts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span>Designation:</span>
            <select
              value={desigFilter}
              onChange={(e) => {
                setDesigFilter(e.target.value);
                setPage(1);
              }}
              className="regionos-input py-1.5 px-3 cursor-pointer w-auto min-w-[120px]"
            >
              {desigs.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="regionos-input py-1.5 px-3 cursor-pointer w-auto min-w-[100px]"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Faculty Table Card */}
      <Card className="text-left">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-border-color text-xs font-bold text-secondary-text uppercase tracking-wider font-mono">
                  <th className="pb-3 text-left">Faculty</th>
                  <th className="pb-3 text-left">Department</th>
                  <th className="pb-3 text-left">Designation</th>
                  <th className="pb-3 text-left">Role</th>
                  <th className="pb-3 text-left">Responsibility</th>
                  <th className="pb-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {displayedRecords.length > 0 ? (
                  displayedRecords.map((rec) => {
                    // Initials for avatar
                    const initials = rec.name
                      .split(" ")
                      .filter((n) => !n.includes("."))
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2);

                    return (
                      <tr key={rec.email} className="hover:bg-muted-bg/30 transition-colors">
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-blue/10 text-primary-blue flex items-center justify-center font-bold text-xs shrink-0 select-none">
                              {initials}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-primary-text leading-tight">
                                {rec.name}
                              </span>
                              <span className="text-xs text-secondary-text font-mono mt-0.5">
                                {rec.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 pr-4 text-sm text-primary-text font-medium">
                          {rec.department}
                        </td>
                        <td className="py-4 pr-4 text-sm text-secondary-text">
                          {rec.designation}
                        </td>
                        <td className="py-4 pr-4 text-sm text-secondary-text">
                          {rec.role}
                        </td>
                        <td className="py-4 pr-4 text-sm text-secondary-text max-w-xs truncate">
                          {rec.responsibility}
                        </td>
                        <td className="py-4 text-left">
                          <Badge
                            variant={
                              rec.status === "ACTIVE"
                                ? "success"
                                : rec.status === "ON LEAVE"
                                ? "warning"
                                : "danger"
                            }
                            className="font-bold text-[10px] uppercase font-mono tracking-wider"
                          >
                            {rec.status}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-border-color text-xs font-semibold text-secondary-text font-mono uppercase tracking-wide">
            <span>
              Showing {displayedRecords.length > 0 ? (page - 1) * 5 + 1 : 0} to{" "}
              {Math.min(page * 5, filteredRecords.length)} of {filteredRecords.length} faculty members
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="py-1.5 cursor-pointer font-mono"
              >
                Prev
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={page * 5 >= filteredRecords.length}
                onClick={() => setPage(page + 1)}
                className="py-1.5 cursor-pointer font-mono"
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
