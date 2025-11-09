import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
export var Sidebar = function (_a) {
    var items = _a.items;
    return (_jsx("aside", { className: "hidden w-64 flex-shrink-0 border-r border-slate-800 bg-[#0c1016] lg:flex", children: _jsx("nav", { className: "flex w-full flex-col gap-1 px-4 py-6 text-sm", children: items.map(function (item) { return (_jsxs(NavLink, { to: item.path, className: function (_a) {
                    var isActive = _a.isActive;
                    return [
                        "flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition",
                        isActive
                            ? "bg-sky-500/10 text-sky-300"
                            : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    ].join(" ");
                }, children: [_jsx("span", { className: "material-icons-sharp text-base", children: item.icon }), _jsx("span", { children: item.label })] }, item.path)); }) }) }));
};
