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
import { useSignClaimMutation } from "../../hooks/useClaims";
export var IssuerSignPage = function () {
    var _a, _b, _c;
    var _d = useState("demo-issuer-token"), issuerToken = _d[0], setIssuerToken = _d[1];
    var _e = useState("employment"), claimType = _e[0], setClaimType = _e[1];
    var _f = useState('{"company": "KnowTruly.me", "title": "Founding Engineer"}'), payload = _f[0], setPayload = _f[1];
    var signMutation = useSignClaimMutation();
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var payloadJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    payloadJson = JSON.parse(payload);
                    return [4 /*yield*/, signMutation.mutateAsync({
                            issuer_token: issuerToken,
                            claim: {
                                type: claimType,
                                payload: payloadJson
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("section", { className: "space-y-6", children: [_jsxs("header", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-100", children: "Sign Claim" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Provide claim payload to sign with the configured RSA keys." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 rounded-2xl border border-slate-800 bg-[#0f141c] p-6", children: [_jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Issuer token", _jsx("input", { value: issuerToken, onChange: function (event) { return setIssuerToken(event.target.value); }, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none" })] }), _jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Claim type", _jsxs("select", { value: claimType, onChange: function (event) { return setClaimType(event.target.value); }, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none", children: [_jsx("option", { value: "employment", children: "Employment" }), _jsx("option", { value: "degree", children: "Degree" }), _jsx("option", { value: "skill", children: "Skill" }), _jsx("option", { value: "project", children: "Project" })] })] }), _jsxs("label", { className: "flex flex-col gap-2 text-sm text-slate-200", children: ["Claim payload (JSON)", _jsx("textarea", { value: payload, onChange: function (event) { return setPayload(event.target.value); }, rows: 4, className: "rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none" })] }), _jsxs("button", { type: "submit", disabled: signMutation.isPending, className: "flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:opacity-50", children: [_jsx("span", { className: "material-icons-sharp text-base", children: "ink_pen" }), signMutation.isPending ? "Signing..." : "Sign Claim"] }), signMutation.isSuccess && (_jsxs("div", { className: "rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-200", children: ["Signature ", (_a = signMutation.data.signature_id) !== null && _a !== void 0 ? _a : signMutation.data.signatureId, " created at", " ", new Date((_c = (_b = signMutation.data.signed_at) !== null && _b !== void 0 ? _b : signMutation.data.signedAt) !== null && _c !== void 0 ? _c : "").toLocaleString(), "."] }))] })] }));
};
