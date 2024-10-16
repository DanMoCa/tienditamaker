import { SidebarContent } from "./sidebar-content";

export function Sidebar({
  activeItem,
  setActiveItem,
}: {
  activeItem: any;
  setActiveItem: any;
}) {
  return (
    <aside className="hidden w-64 bg-white p-4 shadow-md md:block">
      <SidebarContent activeItem={activeItem} setActiveItem={setActiveItem} />
    </aside>
  );
}
