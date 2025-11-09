import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
export var ProtectedRoute = function (_a) {
    var allowedRoles = _a.allowedRoles;
    var location = useLocation();
    var isAuthenticated = useAuthStore(function (state) { return state.isAuthenticated; });
    var user = useAuthStore(function (state) { return state.user; });
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true, state: { from: location } });
    }
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx(Outlet, {});
};
