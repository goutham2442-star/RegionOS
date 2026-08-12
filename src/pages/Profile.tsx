import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import {
  User,
  Mail,
  Phone,
  Building,
  CheckCircle,
  X,
} from "lucide-react";

export const Profile: React.FC = () => {
  const navigate = useNavigate();

  // Profile data states
  const [name, setName] = useState("Guruprasath P");
  const [email, setEmail] = useState("guruprasath.p@regionos.demo");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [dept, setDept] = useState("Executive Leadership");

  // Credential states
  const [empId, setEmpId] = useState("RD-77462");
  const [region, setRegion] = useState("South Region");
  const [joinDate, setJoinDate] = useState("October 14, 2018");

  // Modals state
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Password fields
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Profile changes saved successfully.");
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    setShowPasswordModal(false);
    setCurrPassword("");
    setNewPassword("");
    setConfirmPassword("");
    triggerToast("Password updated successfully.");
  };

  return (
    <AppShell>
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-dark-navy text-white border border-[#1e293b] px-4 py-3 rounded-lg flex items-center gap-2.5 shadow-lg animate-bounce text-xs font-semibold font-mono tracking-wide select-none">
          <CheckCircle className="w-4 h-4 text-success-green" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2FA Modal */}
      {showTwoFactorModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white border border-border-color rounded-2xl shadow-xl overflow-hidden p-6 text-left flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-border-color pb-3">
              <h3 className="text-base font-bold text-primary-text">
                Two-Factor Authentication
              </h3>
              <button
                onClick={() => setShowTwoFactorModal(false)}
                className="text-secondary-text hover:text-primary-text focus:outline-none cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
            <p className="text-xs text-secondary-text leading-relaxed">
              Two-factor authentication is currently enabled for this account.
            </p>
            <div className="flex items-center gap-2 mt-4 justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowTwoFactorModal(false)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                variant="blue"
                size="sm"
                onClick={() => {
                  setShowTwoFactorModal(false);
                  triggerToast("2FA preferences updated.");
                }}
                className="cursor-pointer font-semibold"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white border border-border-color rounded-2xl shadow-xl overflow-hidden p-6 text-left flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-border-color pb-3">
              <h3 className="text-base font-bold text-primary-text">
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-secondary-text hover:text-primary-text focus:outline-none cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-3.5">
              <Input
                label="CURRENT PASSWORD"
                type="password"
                placeholder="••••••••"
                value={currPassword}
                onChange={(e) => setCurrPassword(e.target.value)}
                required
              />
              <Input
                label="NEW PASSWORD"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Input
                label="CONFIRM NEW PASSWORD"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <div className="flex items-center gap-2 mt-4 justify-end border-t border-border-color pt-3.5">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowPasswordModal(false)}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="blue"
                  size="sm"
                  className="cursor-pointer font-semibold"
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header Context */}
      <div className="text-left pb-4 border-b border-border-color">
        <h1 className="text-2xl font-bold text-primary-text tracking-tight m-0">
          Profile
        </h1>
        <p className="text-sm text-secondary-text mt-1">
          Manage your account settings and personal information.
        </p>
      </div>

      {/* Content layout */}
      <form onSubmit={handleSaveChanges} className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left items-start mt-4">
        
        {/* Left Side: Summary Card */}
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col items-center text-center p-8">
            {/* Professional initials placeholder avatar */}
            <div className="w-20 h-20 rounded-full bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center text-primary-blue mb-4 select-none">
              <span className="text-2xl font-bold font-sans">
                {name.split(" ").filter((n) => !n.includes(".")).map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "GP"}
              </span>
            </div>
            
            <h2 className="text-lg font-bold text-primary-text m-0">
              {name}
            </h2>
            <span className="text-xs font-bold text-secondary-text uppercase tracking-widest font-mono mt-1">
              Regional Director
            </span>

            <div className="w-full border-t border-border-color my-5" />

            <div className="flex flex-col gap-3.5 w-full text-xs font-bold font-mono uppercase tracking-wider text-secondary-text">
              <div className="flex items-center justify-between">
                <span>STATUS</span>
                <Badge variant="success" className="font-bold uppercase tracking-wider text-[10px]">ACTIVE</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Last Login</span>
                <span className="text-primary-text font-semibold">Today, 09:42 AM</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side: Inputs */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Card: Personal Information */}
          <Card className="flex flex-col gap-6">
            <CardHeader className="pb-2 border-0">
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute right-3 top-9.5 w-4 h-4 text-secondary-text/60" />
                <Input
                  label="FULL NAME"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute right-3 top-9.5 w-4 h-4 text-secondary-text/60" />
                <Input
                  label="WORK EMAIL"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute right-3 top-9.5 w-4 h-4 text-secondary-text/60" />
                <Input
                  label="PHONE NUMBER"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <Building className="absolute right-3 top-9.5 w-4 h-4 text-secondary-text/60" />
                <Input
                  label="DEPARTMENT"
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Card: Professional Credentials */}
          <Card className="flex flex-col gap-6">
            <CardHeader className="pb-2 border-0">
              <CardTitle>Professional Credentials</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="EMPLOYEE ID"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
                required
              />
              <Input
                label="REGION"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              />
              <div className="md:col-span-2">
                <Input
                  label="DATE OF JOINING"
                  value={joinDate}
                  onChange={(e) => setJoinDate(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Card: Password & Security */}
          <Card className="flex flex-col gap-6">
            <CardHeader className="pb-2 border-0">
              <CardTitle>Password & Security</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {/* 2FA */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-color pb-5">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-primary-text m-0">
                      Two-Factor Authentication
                    </h4>
                    <Badge variant="success" className="font-semibold uppercase tracking-wider font-mono">ENABLED</Badge>
                  </div>
                  <p className="text-xs text-secondary-text m-0 mt-0.5">
                    Add an extra layer of security to your account.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowTwoFactorModal(true)}
                  className="cursor-pointer font-semibold"
                >
                  Manage 2FA
                </Button>
              </div>

              {/* Password change option */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-primary-text m-0">Password</h4>
                  <p className="text-xs text-secondary-text m-0 mt-0.5">
                    Last changed 2 months ago.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowPasswordModal(true)}
                  className="cursor-pointer font-semibold"
                >
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Actions */}
          <div className="flex items-center gap-3.5 mt-2 justify-end border-t border-border-color pt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer px-5 py-2 text-xs font-mono font-bold tracking-wider uppercase"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="cursor-pointer px-5 py-2 text-xs font-mono font-bold tracking-wider uppercase shadow-sm"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </AppShell>
  );
};
