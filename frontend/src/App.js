import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { LandingPage } from "./pages/LandingPage";
import { ResumeDashboardPage } from "./pages/ResumeDashboardPage";
import { TalentSearchPage } from "./pages/TalentSearchPage";
var App = function () { return (_jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(AppLayout, {}), children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/resumes", element: _jsx(ResumeDashboardPage, {}) }), _jsx(Route, { path: "/talent-search", element: _jsx(TalentSearchPage, {}) })] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] })); };
export default App;
