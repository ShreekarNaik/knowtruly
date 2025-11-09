import { create } from "zustand";
var defaultDemoFlag = typeof import.meta !== "undefined" && typeof import.meta.env.VITE_USE_DEMO_DATA !== "undefined"
    ? import.meta.env.VITE_USE_DEMO_DATA !== "false"
    : true;
var apiBaseUrl = (typeof import.meta !== "undefined" && import.meta.env.VITE_API_BASE_URL) || "http://localhost:8000/api/v1";
export var useConfigStore = create(function (set) { return ({
    useDemoData: defaultDemoFlag,
    apiBaseUrl: apiBaseUrl,
    setUseDemoData: function (value) { return set({ useDemoData: value }); },
    toggleDemoData: function () { return set(function (state) { return ({ useDemoData: !state.useDemoData }); }); }
}); });
