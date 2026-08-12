import React, { useEffect, useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { authService } from "../services/authService";
import type { UserProfile } from "../data/mockProfileData";
import { User, Mail, Shield, Calendar, Building } from "lucide-react";

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    authService.getCurrentUser().then(setProfile);
  }, []);

  return (
    <AppShell>
      {/* Header Context */}
      <div className="text-left">
        <h1 className="text-2xl font-semibold text-primary-text tracking-tight">
          User Profile
        </h1>
        <p className="text-sm text-secondary-text mt-1">
          Review your administrative credentials and security configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* User Card */}
        <Card className="flex flex-col items-center text-center p-8">
          <div className="w-20 h-20 rounded-full bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue mb-4">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-lg font-semibold text-primary-text">{profile?.name || "Administrator"}</h2>
          <span className="text-xs font-semibold text-secondary-text uppercase tracking-widest font-mono mt-1">
            {profile?.role || "Central Admin"}
          </span>
          <div className="w-full border-t border-border-color my-6" />
          <Button variant="secondary" size="sm" className="w-full">
            Edit Photo
          </Button>
        </Card>

        {/* Administration details */}
        <Card className="lg:col-span-2 flex flex-col gap-6">
          <CardHeader>
            <CardTitle>Administrative Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-3 pb-3 border-b border-border-color">
              <Mail className="w-5 h-5 text-secondary-text/80" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-secondary-text uppercase tracking-widest font-mono">
                  EMAIL ADDRESS
                </span>
                <span className="text-sm font-semibold text-primary-text">
                  {profile?.email || "g.gagan@regionos.gov"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-border-color">
              <Building className="w-5 h-5 text-secondary-text/80" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-secondary-text uppercase tracking-widest font-mono">
                  ASSIGNED DEPARTMENT
                </span>
                <span className="text-sm font-semibold text-primary-text">
                  {profile?.department || "Central Operations & Governance"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-border-color">
              <Calendar className="w-5 h-5 text-secondary-text/80" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-secondary-text uppercase tracking-widest font-mono">
                  REGISTRATION DATE
                </span>
                <span className="text-sm font-semibold text-primary-text font-mono">
                  {profile?.joinedDate || "2024-03-15"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-secondary-text/80" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-secondary-text uppercase tracking-widest font-mono">
                  SECURITY LEVEL
                </span>
                <span className="text-sm font-semibold text-primary-text font-mono">
                  LEVEL-3 CENTRAL OPERATOR
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};
