import { create } from "zustand";
export var useAuthStore = create(function (set) { return ({
    user: null,
    token: null,
    isAuthenticated: false,
    setAuth: function (user, token) { return set({ user: user, token: token, isAuthenticated: true }); },
    clearAuth: function () { return set({ user: null, token: null, isAuthenticated: false }); }
}); });
