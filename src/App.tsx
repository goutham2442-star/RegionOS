import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Splash } from "./pages/Splash";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Campus } from "./pages/Campus";
import { CampusDetail } from "./pages/CampusDetail";
import { FacultyPage } from "./pages/FacultyPage";
import { FeesPage } from "./pages/FeesPage";
import { PlacementsPage } from "./pages/PlacementsPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { Profile } from "./pages/Profile";
import { Aligns } from "./pages/Aligns";
import { Settings } from "./pages/Settings";
import { Help } from "./pages/Help";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash screen transition */}
        <Route path="/" element={<Splash />} />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard and administrative consoles */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Campus list and detailed campus consoles */}
        <Route path="/campus" element={<Campus />} />
        <Route path="/campus/:id" element={<CampusDetail />} />
        <Route path="/campus/:id/faculty" element={<FacultyPage />} />
        <Route path="/campus/:id/fees" element={<FeesPage />} />
        <Route path="/campus/:id/placements" element={<PlacementsPage />} />
        <Route path="/campus/:id/analytics" element={<AnalyticsPage />} />

        {/* User profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Action ledgers and compliance align page */}
        <Route path="/aligns" element={<Aligns />} />
        
        {/* Help & settings */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
