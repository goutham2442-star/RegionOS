import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { campusService } from "../services/campusService";
import type { Campus as CampusType } from "../data/mockCampusData";
import { Building2, MapPin, Calendar, ArrowRight, Layers } from "lucide-react";

export const Campus: React.FC = () => {
  const [campuses, setCampuses] = useState<CampusType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    campusService.getCampuses().then(setCampuses);
  }, []);

  return (
    <AppShell>
      {/* Page Header */}
      <div className="flex items-center justify-between text-left">
        <div>
          <h1 className="text-2xl font-semibold text-primary-text tracking-tight">
            Campuses & Affiliates
          </h1>
          <p className="text-sm text-secondary-text mt-1">
            Manage regional universities and monitor academic and financial compliance.
          </p>
        </div>
        <Button variant="blue" size="sm">
          Register New Campus
        </Button>
      </div>

      {/* Campus List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campuses.map((campus) => (
          <Card key={campus.id} className="text-left flex flex-col justify-between">
            <div>
              <CardHeader className="border-0 pb-0 mb-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-primary-blue/10 text-primary-blue">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle>{campus.name}</CardTitle>
                    <span className="text-[10px] font-bold text-secondary-text/80 uppercase tracking-widest font-mono">
                      {campus.code}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="mt-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs text-secondary-text">
                  <MapPin className="w-4 h-4 text-border-color" />
                  <span>{campus.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-secondary-text">
                  <Calendar className="w-4 h-4 text-border-color" />
                  <span>Established: {campus.established}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-secondary-text">
                  <Layers className="w-4 h-4 text-border-color" />
                  <span>Type: {campus.type}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border-color">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold text-secondary-text/70 uppercase tracking-widest font-mono">
                      STUDENTS
                    </span>
                    <span className="text-sm font-semibold text-primary-text">
                      {campus.totalStudents}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold text-secondary-text/70 uppercase tracking-widest font-mono">
                      FACULTY
                    </span>
                    <span className="text-sm font-semibold text-primary-text">
                      {campus.totalFaculty}
                    </span>
                  </div>
                </div>
              </CardContent>
            </div>

            <div className="mt-6 pt-4 border-t border-border-color flex items-center justify-between">
              <Badge variant="success">Compliant</Badge>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/campus/${campus.id}`)}
                className="flex items-center gap-1.5"
              >
                Open Console <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
};
