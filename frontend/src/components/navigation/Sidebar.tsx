import { NavLink } from "react-router-dom";

export interface SidebarItem {
  label: string;
  path: string;
  icon: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

export const Sidebar = ({ items }: SidebarProps) => (
  <aside className="hidden w-64 flex-shrink-0 border-r border-slate-800 bg-[#0c1016] lg:flex">
    <nav className="flex w-full flex-col gap-1 px-4 py-6 text-sm">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            [
              "flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition",
              isActive
                ? "bg-sky-500/10 text-sky-300"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            ].join(" ")
          }
        >
          <span className="material-icons-sharp text-base">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);
