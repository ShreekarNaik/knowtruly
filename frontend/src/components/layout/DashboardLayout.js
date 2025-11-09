import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../navigation/Sidebar";
import { TopNav } from "../navigation/TopNav";
import { useAuthStore } from "../../stores/authStore";
var studentNav = [
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
var recruiterNav = [
    { label: "Recruiter Home", path: "/recruiter/dashboard", icon: "dashboard" },
    { label: "Talent Search", path: "/recruiter/search", icon: "travel_explore" },
    { label: "Search Results", path: "/recruiter/search/results", icon: "stacked_bar_chart" },
    { label: "Candidate Profiles", path: "/recruiter/candidates/demo-profile", icon: "badge" },
    { label: "Access Requests", path: "/recruiter/requests", icon: "contact_mail" }
];
var issuerNav = [
    { label: "Issuer Dashboard", path: "/issuer/dashboard", icon: "dashboard_customize" },
    { label: "Claims", path: "/issuer/claims", icon: "assignment_turned_in" },
    { label: "Sign Claim", path: "/issuer/sign", icon: "ink_pen" },
    { label: "Verify Signature", path: "/issuer/verify/demo-signature", icon: "verified" }
];
var adminNav = [
    { label: "Admin Dashboard", path: "/admin/dashboard", icon: "analytics" },
    { label: "User Management", path: "/admin/users", icon: "people_outline" },
    { label: "Templates", path: "/admin/templates", icon: "view_quilt" },
    { label: "System Analytics", path: "/admin/analytics", icon: "insights" }
];
var navByRole = {
    student: studentNav,
    recruiter: recruiterNav,
    issuer: issuerNav,
    admin: adminNav
};
export var DashboardLayout = function () {
    var role = useAuthStore(function (state) { var _a, _b; return (_b = (_a = state.user) === null || _a === void 0 ? void 0 : _a.role) !== null && _b !== void 0 ? _b : "student"; });
    return (_jsxs("div", { className: "flex min-h-screen flex-col bg-[#0a0d12] text-slate-100", children: [_jsx(TopNav, { title: "Talent Intelligence Console" }), _jsxs("div", { className: "flex flex-1", children: [_jsx(Sidebar, { items: navByRole[role] }), _jsx("main", { className: "flex-1 px-4 py-6 sm:px-6 lg:px-10", children: _jsx("div", { className: "mx-auto max-w-6xl space-y-6", children: _jsx(Outlet, {}) }) })] })] }));
};
