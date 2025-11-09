import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { useResumeDetail } from "../../hooks/useResumes";
export var ResumeDetailPage = function () {
    var id = useParams().id;
    var _a = useResumeDetail(id), resumeDetail = _a.data, isLoading = _a.isLoading;
    if (isLoading) {
        return _jsx("p", { className: "text-sm text-slate-400", children: "Loading resume details..." });
    }
    if (!resumeDetail) {
        return _jsx("p", { className: "text-sm text-rose-400", children: "Resume not found." });
    }
    return (_jsxs("section", { className: "space-y-6", children: [_jsxs("header", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-100", children: "Resume Snapshot" }), _jsxs("p", { className: "mt-1 text-sm text-slate-400", children: ["Snapshot ID: ", resumeDetail.profileSnapshotId] })] }), _jsxs("div", { className: "rounded-2xl border border-slate-800 bg-[#0f141c] p-6 text-sm text-slate-300", children: [_jsxs("p", { children: [_jsx("span", { className: "font-semibold text-slate-100", children: "Download:" }), " ", _jsx("a", { href: resumeDetail.downloadUrl, className: "text-sky-300 underline", children: resumeDetail.downloadUrl })] }), _jsxs("p", { className: "mt-3", children: [_jsx("span", { className: "font-semibold text-slate-100", children: "Generated:" }), " ", new Date(resumeDetail.createdAt).toLocaleString()] }), _jsxs("p", { className: "mt-3", children: [_jsx("span", { className: "font-semibold text-slate-100", children: "Format:" }), " ", resumeDetail.format.toUpperCase()] }), _jsxs("div", { className: "mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-500", children: "Generation metadata" }), _jsx("pre", { className: "mt-2 whitespace-pre-wrap text-slate-300", children: JSON.stringify(resumeDetail.generationMetadata, null, 2) })] })] })] }));
};
