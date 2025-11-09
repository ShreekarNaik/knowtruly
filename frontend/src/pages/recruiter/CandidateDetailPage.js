import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import { useRecruiterSearch } from "../../hooks/useRecruiter";
export var RecruiterCandidateDetailPage = function () {
    var id = useParams().id;
    var profile = useProfile(id).data;
    var relatedCandidates = useRecruiterSearch({
        query: "Related candidates",
        top_k: 3
    }).data;
    if (!profile) {
        return _jsx("p", { className: "text-sm text-slate-400", children: "Loading candidate data..." });
    }
    return (_jsxs("section", { className: "space-y-6", children: [_jsxs("header", { className: "rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0f1624] to-[#101c31] p-8", children: [_jsx("h1", { className: "text-3xl font-semibold text-slate-100", children: profile.canonicalName }), _jsx("p", { className: "mt-2 text-sm text-slate-300", children: profile.summary }), _jsxs("p", { className: "mt-3 text-xs text-slate-500", children: ["Version ", profile.version, " \u00B7 Updated ", new Date(profile.updatedAt).toLocaleDateString()] })] }), _jsxs("section", { className: "rounded-2xl border border-slate-800 bg-[#0f141c] p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-100", children: "Highlighted skills" }), _jsx("div", { className: "mt-4 flex flex-wrap gap-2 text-xs", children: profile.skills.map(function (skill) { return (_jsxs("span", { className: "rounded-full px-3 py-1 ".concat(skill.verified ? "bg-emerald-500/10 text-emerald-200" : "bg-slate-800 text-slate-300"), children: [skill.name, " \u00B7 ", skill.proficiency] }, skill.id)); }) })] }), _jsxs("section", { className: "rounded-2xl border border-slate-800 bg-[#0f141c] p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-100", children: "Experience snapshots" }), _jsx("div", { className: "mt-4 space-y-3", children: profile.positions.map(function (position) {
                            var _a;
                            return (_jsxs("article", { className: "rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [_jsx("p", { className: "font-semibold text-slate-100", children: position.title }), _jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-slate-500", children: [position.startDate, " \u2013 ", (_a = position.endDate) !== null && _a !== void 0 ? _a : "Present"] })] }), _jsx("p", { className: "mt-2 text-slate-300", children: position.description })] }, position.id));
                        }) })] }), _jsxs("section", { className: "rounded-2xl border border-slate-800 bg-[#0f141c] p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-100", children: "Similar profiles" }), _jsx("div", { className: "mt-4 space-y-2 text-sm", children: relatedCandidates === null || relatedCandidates === void 0 ? void 0 : relatedCandidates.map(function (candidate) { return (_jsxs("div", { className: "flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2", children: [_jsx("span", { className: "text-slate-300", children: candidate.headline }), _jsxs("span", { className: "text-xs text-sky-300", children: ["Match ", (candidate.matchScore * 100).toFixed(0), "%"] })] }, candidate.candidateId)); }) })] })] }));
};
