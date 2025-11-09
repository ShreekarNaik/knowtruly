import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMatchResults } from "../../hooks/useMatchResults";
import { useResumeList } from "../../hooks/useResumes";
export var AdminAnalyticsPage = function () {
    var _a;
    var resumeList = useResumeList().data;
    var matchResults = useMatchResults({
        query: {
            roleDescriptor: {
                title: "Analytics Probe",
                description: "Internal diagnostic query",
                requiredSkills: ["Monitoring"]
            },
            topK: 3
        }
    }).data;
    var averageProgress = resumeList && resumeList.length > 0
        ? Math.round(resumeList.reduce(function (sum, resume) { return sum + resume.progress; }, 0) / resumeList.length)
        : 0;
    return (_jsxs("section", { className: "space-y-6", children: [_jsxs("header", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-100", children: "Analytics" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Quick health snapshot derived from demo data or live API responses. Extend with real monitoring in production." })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [_jsxs("div", { className: "rounded-2xl border border-slate-800 bg-[#0f141c] p-5", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-500", children: "Average resume readiness" }), _jsxs("p", { className: "mt-3 text-3xl font-semibold text-slate-100", children: [averageProgress, "%"] })] }), _jsxs("div", { className: "rounded-2xl border border-slate-800 bg-[#0f141c] p-5", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-500", children: "Matches evaluated" }), _jsx("p", { className: "mt-3 text-3xl font-semibold text-slate-100", children: (_a = matchResults === null || matchResults === void 0 ? void 0 : matchResults.matches.length) !== null && _a !== void 0 ? _a : 0 })] }), _jsxs("div", { className: "rounded-2xl border border-slate-800 bg-[#0f141c] p-5", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-500", children: "Top score" }), _jsx("p", { className: "mt-3 text-3xl font-semibold text-slate-100", children: (matchResults === null || matchResults === void 0 ? void 0 : matchResults.matches[0]) ? "".concat((matchResults.matches[0].score * 100).toFixed(0), "%") : "—" })] })] })] }));
};
