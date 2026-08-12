import React, { useState } from "react";
import { useNavigate as useNav, Link as LinkDom } from "react-router-dom";
import { RegionOSLogo } from "../components/brand/RegionOSLogo";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Card } from "../components/ui/Card";
import { User, Mail } from "lucide-react";

export const Register: React.FC = () => {
  const [fullName, setFullName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane@regionos.gov");
  const [region, setRegion] = useState("region-north");
  const [password, setPassword] = useState("password123");
  const [confirmPassword, setConfirmPassword] = useState("password123");
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [success, setSuccess] = useState(false);
  const navigate = useNav();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: typeof errors = {};

    if (!fullName) tempErrors.fullName = "Full Name is required.";
    if (!email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      tempErrors.password = "Password is required.";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
    } else {
      setErrors({});
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  const regionOptions = [
    { value: "", label: "Select your operating region" },
    { value: "region-north", label: "North Regional Campus Zone" },
    { value: "region-south", label: "South Regional Campus Zone" },
    { value: "region-east", label: "East Regional Campus Zone" },
    { value: "region-west", label: "West Regional Campus Zone" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-page-bg p-6">
      <div className="w-full max-w-105 flex flex-col gap-6">
        {/* Centered logo */}
        <div className="flex flex-col items-center gap-2">
          <RegionOSLogo variant="light" size="md" showText={true} />
        </div>

        {/* Create Account Card */}
        <Card className="p-8 text-left">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary-text tracking-tight m-0">
              Create Account
            </h2>
            <p className="text-sm text-secondary-text mt-1.5">
              Register to access the regional governance platform.
            </p>
          </div>

          {success ? (
            <div className="p-4 bg-success-green/10 border border-success-green/20 text-success-green text-sm rounded-lg mb-4 text-center font-medium">
              Registration successful! Redirecting to login...
            </div>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="relative">
                <User className="absolute right-3 top-9.5 w-4 h-4 text-secondary-text/60" />
                <Input
                  label="FULL NAME"
                  placeholder="Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={errors.fullName}
                />
              </div>

              {/* Work Email */}
              <div className="relative">
                <Mail className="absolute right-3 top-9.5 w-4 h-4 text-secondary-text/60" />
                <Input
                  label="WORK EMAIL"
                  type="email"
                  placeholder="jane@regionos.gov"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />
              </div>

              {/* Region Select */}
              <Select
                label="REGION"
                options={regionOptions}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />

              {/* Password */}
              <Input
                label="PASSWORD"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              {/* Confirm Password */}
              <Input
                label="CONFIRM PASSWORD"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
              />

              <Button type="submit" variant="blue" className="w-full mt-2 py-2.5">
                Create Account &rarr;
              </Button>
            </form>
          )}

          <div className="text-center mt-6 text-xs text-secondary-text">
            Already have an account?{" "}
            <LinkDom
              to="/login"
              className="text-primary-blue hover:underline font-semibold"
            >
              Sign in
            </LinkDom>
          </div>
        </Card>
      </div>
    </div>
  );
};
