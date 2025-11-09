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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../hooks/useAuth";
export var LoginPage = function () {
    var _a, _b, _c;
    var _d = useState("sophia@knowtruly.me"), email = _d[0], setEmail = _d[1];
    var _e = useState("demo-password"), password = _e[0], setPassword = _e[1];
    var navigate = useNavigate();
    var location = useLocation();
    var from = (_c = (_b = (_a = location.state) === null || _a === void 0 ? void 0 : _a.from) === null || _b === void 0 ? void 0 : _b.pathname) !== null && _c !== void 0 ? _c : "/dashboard";
    var _f = useLoginMutation(), mutateAsync = _f.mutateAsync, isPending = _f.isPending, error = _f.error;
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    return [4 /*yield*/, mutateAsync({ email: email, password: password })];
                case 1:
                    _a.sent();
                    navigate(from, { replace: true });
                    return [2 /*return*/];
            }
        });
    }); };
    return (_jsx("main", { className: "mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-xl flex-col justify-center px-6 py-12", children: _jsxs("div", { className: "rounded-3xl border border-slate-800 bg-[#0d1219] p-8 shadow-xl", children: [_jsx("h1", { className: "text-3xl font-semibold text-slate-100", children: "Welcome back" }), _jsxs("p", { className: "mt-2 text-sm text-slate-400", children: ["Use any email that includes ", _jsx("code", { children: "recruiter" }), ", ", _jsx("code", { children: "issuer" }), ", or ", _jsx("code", { children: "admin" }), " to explore those roles in demo mode."] }), _jsxs("form", { className: "mt-8 space-y-5", onSubmit: handleSubmit, children: [_jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Email", _jsx("input", { type: "email", className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none", value: email, onChange: function (event) { return setEmail(event.target.value); }, required: true })] }), _jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Password", _jsx("input", { type: "password", className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none", value: password, onChange: function (event) { return setPassword(event.target.value); }, required: true })] }), error && _jsx("p", { className: "text-sm text-rose-400", children: "Failed to sign in. Please try again." }), _jsxs("button", { type: "submit", disabled: isPending, className: "flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:opacity-50", children: [_jsx("span", { className: "material-icons-sharp text-base", children: "login" }), isPending ? "Signing in..." : "Sign In"] })] }), _jsxs("p", { className: "mt-6 text-center text-xs text-slate-400", children: ["Need an account?", " ", _jsx(Link, { to: "/register", className: "text-sky-300 underline", children: "Register here" })] })] }) }));
};
