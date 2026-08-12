import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RegionOSLogo } from "../components/brand/RegionOSLogo";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { KeyRound, Mail } from "lucide-react";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("g.gagan@regionos.gov");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      navigate("/dashboard");
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page-bg p-6">
      <div className="w-full max-w-105 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <RegionOSLogo variant="light" size="lg" />
          <p className="text-sm text-secondary-text mt-2">
            Regional University Governance Platform
          </p>
        </div>

        <Card className="p-8">
          <h2 className="text-xl font-semibold text-primary-text mb-1 text-left">
            Sign In
          </h2>
          <p className="text-sm text-secondary-text mb-6 text-left">
            Access your campus administration console.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 text-xs bg-danger-red/10 border border-danger-red/20 text-danger-red rounded-lg text-left">
                {error}
              </div>
            )}

            <div className="relative">
              <Mail className="absolute right-3 top-9 w-4 h-4 text-secondary-text/60" />
              <Input
                label="ADMINISTRATIVE EMAIL"
                type="email"
                placeholder="email@regionos.gov"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <KeyRound className="absolute right-3 top-9 w-4 h-4 text-secondary-text/60" />
              <Input
                label="PASSWORD"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-xs mt-1">
              <label className="flex items-center gap-2 text-secondary-text cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-border-color text-primary-blue focus:ring-primary-blue cursor-pointer"
                />
                Remember this terminal
              </label>
              <a
                href="#forgot"
                className="text-primary-blue hover:underline font-semibold"
              >
                Reset Credentials
              </a>
            </div>

            <Button type="submit" variant="blue" className="w-full mt-2 py-2.5">
              Authenticate Session
            </Button>
          </form>
        </Card>

        <div className="text-center text-xs text-secondary-text">
          Unauthorized access is subject to regional audit.{" "}
          <Link
            to="/register"
            className="text-primary-blue hover:underline font-semibold"
          >
            Register new administrator
          </Link>
        </div>
      </div>
    </div>
  );
};
