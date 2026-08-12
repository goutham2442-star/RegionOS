import React, { useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Select } from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { CheckCircle } from "lucide-react";

export const Settings: React.FC = () => {
  const [theme, setTheme] = useState("System Default");
  const [emailNotify, setEmailNotify] = useState(true);
  const [systemNotify, setSystemNotify] = useState(true);
  const [region, setRegion] = useState("South Region");
  const [language, setLanguage] = useState("English");
  const [toast, setToast] = useState<string | null>(null);

  const handleSaveSettings = () => {
    setToast("Settings saved successfully.");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AppShell>
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-dark-navy text-white border border-[#1e293b] px-4 py-3 rounded-lg flex items-center gap-2.5 shadow-lg animate-bounce text-xs font-semibold font-mono tracking-wide select-none">
          <CheckCircle className="w-4 h-4 text-success-green" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Context */}
      <div className="text-left pb-4 border-b border-border-color">
        <h1 className="text-2xl font-bold text-primary-text tracking-tight m-0">
          Settings
        </h1>
        <p className="text-sm text-secondary-text mt-1">
          Manage your RegionOS preferences.
        </p>
      </div>

      <div className="flex flex-col gap-6 text-left max-w-3xl">
        {/* Card: Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent className="max-w-sm mt-2">
            <Select
              label="Theme"
              options={[
                { value: "System Default", label: "System Default" },
                { value: "Light Mode", label: "Light Mode" },
                { value: "Dark Mode", label: "Dark Mode" },
              ]}
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Card: Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 mt-2">
            <label className="flex items-center justify-between text-sm text-primary-text cursor-pointer select-none">
              <div className="flex flex-col">
                <span className="font-semibold">Email Notifications</span>
                <span className="text-xs text-secondary-text mt-0.5">Receive regional administrative status updates via email.</span>
              </div>
              <input
                type="checkbox"
                checked={emailNotify}
                onChange={() => setEmailNotify(!emailNotify)}
                className="w-4.5 h-4.5 rounded border-border-color text-primary-blue focus:ring-primary-blue cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-sm text-primary-text cursor-pointer select-none">
              <div className="flex flex-col">
                <span className="font-semibold">System Notifications</span>
                <span className="text-xs text-secondary-text mt-0.5">Show critical banners and reminders in the administration header.</span>
              </div>
              <input
                type="checkbox"
                checked={systemNotify}
                onChange={() => setSystemNotify(!systemNotify)}
                className="w-4.5 h-4.5 rounded border-border-color text-primary-blue focus:ring-primary-blue cursor-pointer"
              />
            </label>
          </CardContent>
        </Card>

        {/* Card: Regional Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Preferences</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <Select
              label="Region"
              options={[
                { value: "South Region", label: "South Region" },
                { value: "North Region", label: "North Region" },
                { value: "East Region", label: "East Region" },
                { value: "West Region", label: "West Region" },
              ]}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />

            <Select
              label="Language"
              options={[
                { value: "English", label: "English" },
                { value: "Hindi", label: "Hindi" },
                { value: "Spanish", label: "Spanish" },
              ]}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="flex justify-end mt-2">
          <Button
            onClick={handleSaveSettings}
            variant="blue"
            className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase font-mono shadow-sm cursor-pointer"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </AppShell>
  );
};
