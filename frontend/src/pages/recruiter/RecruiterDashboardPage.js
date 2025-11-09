import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRecruiterSearch } from "../../hooks/useRecruiter";
export var RecruiterDashboardPage = function () {
    var candidates = useRecruiterSearch({
        query: "Senior software engineer",
        top_k: 3
    }).data;
    return (_jsxs("section", { className: "space-y-6", children: [_jsxs("header", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-100", children: "Recruiter Dashboard" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Review saved searches, candidate matches, and access requests. Demo mode provides seed results instantly." })] }), _jsxs("section", { className: "rounded-2xl border border-slate-800 bg-[#0f141c] p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-100", children: "Recommended matches" }), _jsxs("div", { className: "mt-4 space-y-3", children: [candidates === null || candidates === void 0 ? void 0 : candidates.map(function (candidate) {
                                var _a;
                                return (_jsx("article", { className: "rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-slate-100", children: (_a = candidate.name) !== null && _a !== void 0 ? _a : "Redacted profile" }), _jsx("p", { className: "text-xs text-slate-500", children: candidate.headline })] }), _jsxs("span", { className: "rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-300", children: ["Match ", (candidate.matchScore * 100).toFixed(0), "%"] })] }) }, candidate.candidateId));
                            }), !(candidates === null || candidates === void 0 ? void 0 : candidates.length) && _jsx("p", { className: "text-sm text-slate-500", children: "Run a search to populate matches." })] })] })] }));
};
