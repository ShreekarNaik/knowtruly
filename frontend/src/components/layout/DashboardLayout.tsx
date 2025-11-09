import { Outlet } from "react-router-dom";
import { Sidebar, type SidebarItem } from "../navigation/Sidebar";
import { TopNav } from "../navigation/TopNav";
import { useAuthStore } from "../../stores/authStore";
import type { UserRole } from "../../types";

const studentNav: SidebarItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: "space_dashboard" },
  { label: "Profile Overview", path: "/profile", icon: "badge" },
  { label: "Education", path: "/profile/education", icon: "school" },
  { label: "Experience", path: "/profile/experience", icon: "work" },
  { label: "Skills", path: "/profile/skills", icon: "bolt" },
  { label: "Projects", path: "/profile/projects", icon: "hub" },
  { label: "Resumes", path: "/resumes", icon: "description" },
  { label: "Generate Resume", path: "/resumes/generate", icon: "magic_button" },
  { label: "Verification", path: "/verification", icon: "verified_user" },
  { label: "Settings", path: "/settings", icon: "settings" }
];

const recruiterNav: SidebarItem[] = [
  { label: "Recruiter Home", path: "/recruiter/dashboard", icon: "dashboard" },
  { label: "Talent Search", path: "/recruiter/search", icon: "travel_explore" },
  { label: "Search Results", path: "/recruiter/search/results", icon: "stacked_bar_chart" },
  { label: "Candidate Profiles", path: "/recruiter/candidates/demo-profile", icon: "badge" },
  { label: "Access Requests", path: "/recruiter/requests", icon: "contact_mail" }
];

const issuerNav: SidebarItem[] = [
  { label: "Issuer Dashboard", path: "/issuer/dashboard", icon: "dashboard_customize" },
  { label: "Claims", path: "/issuer/claims", icon: "assignment_turned_in" },
  { label: "Sign Claim", path: "/issuer/sign", icon: "ink_pen" },
  { label: "Verify Signature", path: "/issuer/verify/demo-signature", icon: "verified" }
];

const adminNav: SidebarItem[] = [
  { label: "Admin Dashboard", path: "/admin/dashboard", icon: "analytics" },
  { label: "User Management", path: "/admin/users", icon: "people_outline" },
  { label: "Templates", path: "/admin/templates", icon: "view_quilt" },
  { label: "System Analytics", path: "/admin/analytics", icon: "insights" }
];

const navByRole: Record<UserRole, SidebarItem[]> = {
  student: studentNav,
  recruiter: recruiterNav,
  issuer: issuerNav,
  admin: adminNav
};

export const DashboardLayout = () => {
  const role = useAuthStore((state) => state.user?.role ?? "student");

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0d12] text-slate-100">
      <TopNav title="Talent Intelligence Console" />
      <div className="flex flex-1">
        <Sidebar items={navByRole[role]} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
