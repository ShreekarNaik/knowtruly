import { Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { PublicLayout } from "./components/layout/PublicLayout";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { NotFoundPage } from "./pages/common/NotFoundPage";
import { AdminAnalyticsPage } from "./pages/admin/AdminAnalyticsPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminTemplatesPage } from "./pages/admin/AdminTemplatesPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { IssuerClaimsPage } from "./pages/issuer/IssuerClaimsPage";
import { IssuerDashboardPage } from "./pages/issuer/IssuerDashboardPage";
import { IssuerSignPage } from "./pages/issuer/IssuerSignPage";
import { VerifySignaturePage } from "./pages/issuer/VerifySignaturePage";
import { RecruiterCandidateDetailPage } from "./pages/recruiter/CandidateDetailPage";
import { RecruiterDashboardPage } from "./pages/recruiter/RecruiterDashboardPage";
import { RecruiterRequestsPage } from "./pages/recruiter/RecruiterRequestsPage";
import { RecruiterSearchResultsPage } from "./pages/recruiter/RecruiterSearchResultsPage";
import { TalentSearchPage } from "./pages/recruiter/TalentSearchPage";
import { GenerateResumePage } from "./pages/student/GenerateResumePage";
import { ProfileEducationPage } from "./pages/student/ProfileEducationPage";
import { ProfileExperiencePage } from "./pages/student/ProfileExperiencePage";
import { ProfilePage } from "./pages/student/ProfilePage";
import { ProfileProjectsPage } from "./pages/student/ProfileProjectsPage";
import { ProfileSkillsPage } from "./pages/student/ProfileSkillsPage";
import { ResumeDashboardPage } from "./pages/student/ResumeDashboardPage";
import { ResumeDetailPage } from "./pages/student/ResumeDetailPage";
import { SettingsPage } from "./pages/student/SettingsPage";
import { StudentDashboardPage } from "./pages/student/DashboardPage";
import { VerificationPage } from "./pages/student/VerificationPage";
import { AboutPage } from "./pages/public/AboutPage";
import { LandingPage } from "./pages/public/LandingPage";
import { LoginPage } from "./pages/public/LoginPage";
import { RegisterPage } from "./pages/public/RegisterPage";
import { TemplatesPage } from "./pages/public/TemplatesPage";

const App = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<StudentDashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/education" element={<ProfileEducationPage />} />
        <Route path="/profile/experience" element={<ProfileExperiencePage />} />
        <Route path="/profile/skills" element={<ProfileSkillsPage />} />
        <Route path="/profile/projects" element={<ProfileProjectsPage />} />
        <Route path="/resumes" element={<ResumeDashboardPage />} />
        <Route path="/resumes/generate" element={<GenerateResumePage />} />
        <Route path="/resumes/:id" element={<ResumeDetailPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/recruiter/dashboard" element={<RecruiterDashboardPage />} />
        <Route path="/recruiter/search" element={<TalentSearchPage />} />
        <Route path="/recruiter/search/results" element={<RecruiterSearchResultsPage />} />
        <Route path="/recruiter/candidates/:id" element={<RecruiterCandidateDetailPage />} />
        <Route path="/recruiter/requests" element={<RecruiterRequestsPage />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["issuer"]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/issuer/dashboard" element={<IssuerDashboardPage />} />
        <Route path="/issuer/claims" element={<IssuerClaimsPage />} />
        <Route path="/issuer/sign" element={<IssuerSignPage />} />
        <Route path="/issuer/verify/:signature_id" element={<VerifySignaturePage />} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/templates" element={<AdminTemplatesPage />} />
        <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default App;
