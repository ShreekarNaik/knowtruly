export interface SidebarItem {
    label: string;
    path: string;
    icon: string;
}
interface SidebarProps {
    items: SidebarItem[];
}
export declare const Sidebar: ({ items }: SidebarProps) => import("react/jsx-runtime").JSX.Element;
export {};
