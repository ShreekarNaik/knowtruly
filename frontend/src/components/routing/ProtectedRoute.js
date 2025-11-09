import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
export var ProtectedRoute = function (_a) {
    var allowedRoles = _a.allowedRoles;
    var location = useLocation();
    var _b = useAuthStore(function (state) { return ({
        isAuthenticated: state.isAuthenticated,
        user: state.user
    }); }), isAuthenticated = _b.isAuthenticated, user = _b.user;
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true, state: { from: location } });
    }
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx(Outlet, {});
};
