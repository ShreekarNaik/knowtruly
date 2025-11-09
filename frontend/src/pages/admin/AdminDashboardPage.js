import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useClaims } from "../../hooks/useClaims";
import { useMatchResults } from "../../hooks/useMatchResults";
import { useProfilesList } from "../../hooks/useProfile";
import { useTemplates } from "../../hooks/useTemplates";
export var AdminDashboardPage = function () {
    var _a, _b, _c;
    var profiles = useProfilesList().data;
    var templates = useTemplates().data;
    var claims = useClaims().data;
    var matchResults = useMatchResults({
        query: {
            roleDescriptor: {
                title: "System Health Check",
                description: "Sample query used for administrative monitoring.",
                requiredSkills: ["FastAPI"]
            },
            topK: 1
        }
    }).data;
    return (_jsxs("section", { className: "space-y-6", children: [_jsxs("header", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-100", children: "Admin Dashboard" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Monitor data counts and ensure services respond even when the backend is offline by leveraging demo mode." })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-4", children: [_jsxs("div", { className: "rounded-2xl border border-slate-800 bg-[#0f141c] p-4", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-500", children: "Profiles" }), _jsx("p", { className: "mt-2 text-3xl font-semibold text-slate-100", children: (_a = profiles === null || profiles === void 0 ? void 0 : profiles.length) !== null && _a !== void 0 ? _a : 0 })] }), _jsxs("div", { className: "rounded-2xl border border-slate-800 bg-[#0f141c] p-4", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-500", children: "Templates" }), _jsx("p", { className: "mt-2 text-3xl font-semibold text-slate-100", children: (_b = templates === null || templates === void 0 ? void 0 : templates.length) !== null && _b !== void 0 ? _b : 0 })] }), _jsxs("div", { className: "rounded-2xl border border-slate-800 bg-[#0f141c] p-4", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-500", children: "Claims" }), _jsx("p", { className: "mt-2 text-3xl font-semibold text-slate-100", children: (_c = claims === null || claims === void 0 ? void 0 : claims.length) !== null && _c !== void 0 ? _c : 0 })] }), _jsxs("div", { className: "rounded-2xl border border-slate-800 bg-[#0f141c] p-4", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-500", children: "Match latency" }), _jsx("p", { className: "mt-2 text-3xl font-semibold text-slate-100", children: (matchResults === null || matchResults === void 0 ? void 0 : matchResults.matches[0]) ? "".concat((matchResults.matches[0].score * 100).toFixed(0), "%") : "—" })] })] })] }));
};
