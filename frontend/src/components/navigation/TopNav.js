import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useConfigStore } from "../../stores/configStore";
export var TopNav = function (_a) {
    var title = _a.title, actionSlot = _a.actionSlot;
    var _b = useAuthStore(function (state) { return ({
        user: state.user,
        clearAuth: state.clearAuth
    }); }), user = _b.user, clearAuth = _b.clearAuth;
    var _c = useConfigStore(function (state) { return ({
        useDemoData: state.useDemoData,
        toggleDemoData: state.toggleDemoData
    }); }), useDemoData = _c.useDemoData, toggleDemoData = _c.toggleDemoData;
    return (_jsxs("header", { className: "flex h-16 items-center justify-between border-b border-slate-800 bg-[#11161c] px-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [_jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-[#0c7ff2]/15 text-[#0c7ff2]", children: _jsx("svg", { className: "h-5 w-5", viewBox: "0 0 48 48", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44H42.4379Z" }) }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-sky-200", children: "KnowTruly.me" }), title && _jsx("p", { className: "text-xs text-slate-400", children: title })] })] }), actionSlot] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("button", { onClick: toggleDemoData, className: "flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold transition ".concat(useDemoData
                            ? "border-emerald-500/80 bg-emerald-500/10 text-emerald-300"
                            : "border-slate-700 bg-slate-900 text-slate-300"), children: [_jsx("span", { className: "material-icons-sharp text-base", children: useDemoData ? "visibility" : "cloud_done" }), useDemoData ? "Demo Data" : "Live API"] }), user ? (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm font-semibold text-slate-200", children: user.name }), _jsx("p", { className: "text-xs uppercase tracking-widest text-slate-500", children: user.role })] }), _jsx("button", { onClick: clearAuth, className: "flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-slate-300 transition hover:text-sky-300", "aria-label": "Sign out", children: _jsx("span", { className: "material-icons-sharp text-base", children: "logout" }) })] })) : (_jsx(Link, { to: "/login", className: "rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500", children: "Sign In" }))] })] }));
};
