import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RegionOSLogo } from "../components/brand/RegionOSLogo";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Card } from "../components/ui/Card";
import { User, Mail } from "lucide-react";

export const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Regional Administrator");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      navigate("/dashboard");
    } else {
      setError("Please fill in all fields.");
    }
  };

  const roleOptions = [
    { value: "Regional Administrator", label: "Regional Administrator" },
    { value: "Campus Dean", label: "Campus Dean" },
    { value: "Department Head", label: "Department Head" },
    { value: "Audit Officer", label: "Audit Officer" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-page-bg p-6">
      <div className="w-full max-w-[420px] flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <RegionOSLogo variant="light" size="lg" />
          <p className="text-sm text-secondary-text mt-2">
            Regional University Governance Platform
          </p>
        </div>

        <Card className="p-8">
          <h2 className="text-xl font-semibold text-primary-text mb-1 text-left">
            Register Account
          </h2>
          <p className="text-sm text-secondary-text mb-6 text-left">
            Create administrative credentials for the system.
          </p>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 text-xs bg-danger-red/10 border border-danger-red/20 text-danger-red rounded-lg text-left">
                {error}
              </div>
            )}

            <div className="relative">
              <User className="absolute right-3 top-9 w-4 h-4 text-secondary-text/60" />
              <Input
                label="FULL NAME"
                placeholder="Dr. Alexander Wright"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative">
              <Mail className="absolute right-3 top-9 w-4 h-4 text-secondary-text/60" />
              <Input
                label="OFFICIAL EMAIL"
                type="email"
                placeholder="a.wright@regionos.gov"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Select
              label="ASSIGNED ROLE"
              options={roleOptions}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <Button type="submit" variant="blue" className="w-full mt-2 py-2.5">
              Request Authorization
            </Button>
          </form>
        </Card>

        <div className="text-center text-xs text-secondary-text">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-blue hover:underline font-semibold"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};
