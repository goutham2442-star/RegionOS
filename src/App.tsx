import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Campus } from "./pages/Campus";
import { CampusDetail } from "./pages/CampusDetail";
import { Profile } from "./pages/Profile";
import { Aligns } from "./pages/Aligns";
import { Settings } from "./pages/Settings";
import { Help } from "./pages/Help";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard and administrative consoles */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Campus list and detailed campus consoles */}
        <Route path="/campus" element={<Campus />} />
        <Route path="/campus/:id" element={<CampusDetail />} />
        <Route path="/campus/:id/faculty" element={<CampusDetail />} />
        <Route path="/campus/:id/fees" element={<CampusDetail />} />
        <Route path="/campus/:id/placements" element={<CampusDetail />} />
        <Route path="/campus/:id/analytics" element={<CampusDetail />} />

        {/* User profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Action ledgers and compliance align page */}
        <Route path="/aligns" element={<Aligns />} />
        
        {/* Help, settings & fallback */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
