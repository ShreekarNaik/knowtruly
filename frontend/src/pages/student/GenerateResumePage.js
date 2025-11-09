var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useGenerateResumeMutation } from "../../hooks/useResumes";
import { useTemplates } from "../../hooks/useTemplates";
import { useAuthStore } from "../../stores/authStore";
var defaultRoleDescriptor = {
    title: "Senior Software Engineer",
    description: "Lead high-impact AI resume features across the KnowTruly stack.",
    requiredSkills: "FastAPI, React, Gemini API"
};
export var GenerateResumePage = function () {
    var templates = useTemplates().data;
    var profileId = useAuthStore(function (state) { var _a, _b; return (_b = (_a = state.user) === null || _a === void 0 ? void 0 : _a.profileId) !== null && _b !== void 0 ? _b : "demo-profile"; });
    var _a = useState("tmpl-modern"), selectedTemplate = _a[0], setSelectedTemplate = _a[1];
    var _b = useState(defaultRoleDescriptor.title), roleTitle = _b[0], setRoleTitle = _b[1];
    var _c = useState(defaultRoleDescriptor.description), roleDescription = _c[0], setRoleDescription = _c[1];
    var _d = useState(defaultRoleDescriptor.requiredSkills), requiredSkills = _d[0], setRequiredSkills = _d[1];
    var _e = useState(true), aiRephrase = _e[0], setAiRephrase = _e[1];
    var _f = useState(2), maxPages = _f[0], setMaxPages = _f[1];
    var _g = useState("pdf"), format = _g[0], setFormat = _g[1];
    var generateResume = useGenerateResumeMutation(profileId);
    var templateOptions = useMemo(function () { return templates !== null && templates !== void 0 ? templates : []; }, [templates]);
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    return [4 /*yield*/, generateResume.mutateAsync({
                            profile_id: profileId,
                            template_id: selectedTemplate,
                            role_descriptor: {
                                title: roleTitle,
                                description: roleDescription,
                                required_skills: requiredSkills.split(",").map(function (skill) { return skill.trim(); })
                            },
                            options: {
                                ai_rephrase: aiRephrase,
                                max_pages: maxPages,
                                format: format
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("section", { className: "space-y-6", children: [_jsxs("header", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-100", children: "Generate Resume" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "The backend Typst service compiles the resume and stores a snapshot. In demo mode you'll receive a mock response." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Template", _jsx("select", { value: selectedTemplate, onChange: function (event) { return setSelectedTemplate(event.target.value); }, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none", children: templateOptions.map(function (template) { return (_jsx("option", { value: template.templateId, children: template.name }, template.templateId)); }) })] }), _jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Output format", _jsxs("select", { value: format, onChange: function (event) { return setFormat(event.target.value); }, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none", children: [_jsx("option", { value: "pdf", children: "PDF" }), _jsx("option", { value: "docx", children: "DOCX" }), _jsx("option", { value: "html", children: "HTML" })] })] })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Role title", _jsx("input", { value: roleTitle, onChange: function (event) { return setRoleTitle(event.target.value); }, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none" })] }), _jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Max pages", _jsx("input", { type: "number", min: 1, max: 4, value: maxPages, onChange: function (event) { return setMaxPages(Number.parseInt(event.target.value, 10)); }, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none" })] })] }), _jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Role description", _jsx("textarea", { value: roleDescription, onChange: function (event) { return setRoleDescription(event.target.value); }, rows: 4, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none" })] }), _jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Required skills (comma separated)", _jsx("input", { value: requiredSkills, onChange: function (event) { return setRequiredSkills(event.target.value); }, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none" })] }), _jsxs("label", { className: "flex items-center gap-3 text-sm text-slate-200", children: [_jsx("input", { type: "checkbox", checked: aiRephrase, onChange: function (event) { return setAiRephrase(event.target.checked); }, className: "h-4 w-4 rounded border border-slate-700 bg-slate-900 text-sky-500 focus:ring-sky-500" }), "Use Gemini AI to rephrase key sections"] }), _jsxs("button", { type: "submit", disabled: generateResume.isPending, className: "flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:opacity-50", children: [_jsx("span", { className: "material-icons-sharp text-base", children: "play_arrow" }), generateResume.isPending ? "Generating..." : "Generate Resume"] }), generateResume.isSuccess && (_jsxs("div", { className: "rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-200", children: ["Resume generated with template", " ", _jsx("span", { className: "font-semibold", children: generateResume.data.generation_metadata.templateUsed }), ". Download URL:", " ", _jsx("code", { className: "text-emerald-100", children: generateResume.data.download_url })] }))] })] }));
};
