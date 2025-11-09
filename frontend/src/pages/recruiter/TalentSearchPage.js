import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useRecruiterSearch } from "../../hooks/useRecruiter";
export var TalentSearchPage = function () {
    var _a;
    var _b = useState("Senior software engineer with AI experience"), query = _b[0], setQuery = _b[1];
    var _c = useState("React, FastAPI, Gemini API"), skills = _c[0], setSkills = _c[1];
    var _d = useState("Remote"), location = _d[0], setLocation = _d[1];
    var _e = useState(query), submittedQuery = _e[0], setSubmittedQuery = _e[1];
    var searchPayload = useMemo(function () { return ({
        query: submittedQuery,
        filters: {
            skills: skills.split(",").map(function (skill) { return skill.trim(); }),
            location: location
        },
        top_k: 10
    }); }, [submittedQuery, skills, location]);
    var _f = useRecruiterSearch(searchPayload), candidates = _f.data, isLoading = _f.isLoading;
    var handleSubmit = function (event) {
        event.preventDefault();
        setSubmittedQuery(query);
    };
    return (_jsxs("section", { className: "space-y-6", children: [_jsxs("header", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-100", children: "Talent Search" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Enter a natural language query. The semantic engine combines embeddings with filters for precise matches." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 rounded-2xl border border-slate-800 bg-[#0f141c] p-6", children: [_jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Search query", _jsx("textarea", { value: query, onChange: function (event) { return setQuery(event.target.value); }, rows: 3, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none" })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Key skills (comma separated)", _jsx("input", { value: skills, onChange: function (event) { return setSkills(event.target.value); }, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none" })] }), _jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Location preference", _jsx("input", { value: location, onChange: function (event) { return setLocation(event.target.value); }, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none" })] })] }), _jsxs("button", { type: "submit", className: "flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500", children: [_jsx("span", { className: "material-icons-sharp text-base", children: "search" }), "Run Search"] })] }), _jsxs("section", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-100", children: "Results" }), _jsx("span", { className: "text-xs uppercase tracking-[0.2em] text-slate-500", children: isLoading ? "Loading..." : "".concat((_a = candidates === null || candidates === void 0 ? void 0 : candidates.length) !== null && _a !== void 0 ? _a : 0, " matches") })] }), _jsxs("div", { className: "grid gap-4", children: [candidates === null || candidates === void 0 ? void 0 : candidates.map(function (candidate) {
                                var _a;
                                return (_jsxs("article", { className: "rounded-2xl border border-slate-800 bg-[#0f141c] p-6", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-lg font-semibold text-slate-100", children: (_a = candidate.name) !== null && _a !== void 0 ? _a : "Redacted profile" }), _jsx("p", { className: "text-sm text-slate-400", children: candidate.headline })] }), _jsxs("span", { className: "rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-300", children: ["Match ", (candidate.matchScore * 100).toFixed(0), "%"] })] }), _jsx("p", { className: "mt-3 text-xs uppercase tracking-[0.2em] text-slate-500", children: candidate.previewOnly ? "Preview only" : "Full profile" })] }, candidate.candidateId));
                            }), !(candidates === null || candidates === void 0 ? void 0 : candidates.length) && !isLoading && (_jsx("p", { className: "text-sm text-slate-500", children: "No results yet. Adjust filters and try again." }))] })] })] }));
};
