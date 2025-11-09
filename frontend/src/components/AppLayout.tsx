import { Outlet } from "react-router-dom";

export const AppLayout = () => (
  <div className="min-h-screen bg-[#111418] text-white font-sans">
    <Outlet />
  </div>
);
