import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RegionOSLogo } from "../components/brand/RegionOSLogo";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Eye, EyeOff, Mail } from "lucide-react";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("name@company.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: { email?: string; password?: string } = {};

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

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
    } else {
      setErrors({});
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page-bg p-6">
      <div className="w-full max-w-105 flex flex-col gap-6">
        {/* Centered logo */}
        <div className="flex flex-col items-center gap-2">
          <RegionOSLogo variant="light" size="md" showText={true} />
        </div>

        {/* Centered Card */}
        <Card className="p-8 text-left">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary-text tracking-tight m-0">
              Welcome back.
            </h2>
            <p className="text-sm text-secondary-text mt-1.5">
              Sign in to your RegionOS account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute right-3 top-9.5 w-4 h-4 text-secondary-text/60" />
              <Input
                label="EMAIL"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9.5 p-1 text-secondary-text hover:text-primary-blue cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <Input
                label="PASSWORD"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
            </div>

            {/* Remember & Forgot controls */}
            <div className="flex items-center justify-between text-xs mt-1">
              <label className="flex items-center gap-2 text-secondary-text cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-border-color text-primary-blue focus:ring-primary-blue cursor-pointer"
                />
                Remember me
              </label>
              <a
                href="#forgot"
                className="text-primary-blue hover:underline font-semibold"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button type="submit" variant="blue" className="w-full mt-2 py-2.5">
              Sign In
            </Button>
          </form>

          {/* Create account link */}
          <div className="text-center mt-6 text-xs text-secondary-text">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary-blue hover:underline font-semibold"
            >
              Create account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
