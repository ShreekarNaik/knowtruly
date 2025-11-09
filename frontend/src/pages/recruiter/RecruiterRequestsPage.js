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
import { useState } from "react";
import { useAccessRequestMutation } from "../../hooks/useRecruiter";
export var RecruiterRequestsPage = function () {
    var _a = useState("demo-profile"), candidateId = _a[0], setCandidateId = _a[1];
    var _b = useState("role-frontend-lead"), roleId = _b[0], setRoleId = _b[1];
    var _c = useState("We would love to schedule a 30 minute intro call."), message = _c[0], setMessage = _c[1];
    var requestMutation = useAccessRequestMutation();
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    return [4 /*yield*/, requestMutation.mutateAsync({ candidate_id: candidateId, role_id: roleId, message: message })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("section", { className: "space-y-6", children: [_jsxs("header", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-100", children: "Access Requests" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Request full profile access. In demo mode the request returns immediately with a pending status." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 rounded-2xl border border-slate-800 bg-[#0f141c] p-6", children: [_jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Candidate ID", _jsx("input", { value: candidateId, onChange: function (event) { return setCandidateId(event.target.value); }, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none" })] }), _jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Role ID", _jsx("input", { value: roleId, onChange: function (event) { return setRoleId(event.target.value); }, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none" })] }), _jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Message", _jsx("textarea", { value: message, onChange: function (event) { return setMessage(event.target.value); }, rows: 3, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none" })] }), _jsxs("button", { type: "submit", disabled: requestMutation.isPending, className: "flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:opacity-50", children: [_jsx("span", { className: "material-icons-sharp text-base", children: "send" }), requestMutation.isPending ? "Submitting..." : "Submit Request"] }), requestMutation.isSuccess && requestMutation.data && (_jsxs("div", { className: "rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-200", children: ["Request ", requestMutation.data.request_id, " is", " ", _jsx("span", { className: "font-semibold uppercase tracking-widest", children: requestMutation.data.status }), " until", " ", new Date(requestMutation.data.expires_at).toLocaleDateString(), "."] }))] })] }));
};
