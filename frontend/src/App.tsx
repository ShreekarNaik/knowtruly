import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { LandingPage } from "./pages/LandingPage";
import { ResumeDashboardPage } from "./pages/ResumeDashboardPage";
import { TalentSearchPage } from "./pages/TalentSearchPage";

const App = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/resumes" element={<ResumeDashboardPage />} />
      <Route path="/talent-search" element={<TalentSearchPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
