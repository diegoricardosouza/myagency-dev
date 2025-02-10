import { useNavigate } from "react-router-dom";
import { IconLogo } from "./IconLogo";
import { Logo } from "./Logo";
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "./ui/sidebar";

export function TeamSwitcher() {
  const { open } = useSidebar();
  const navigate = useNavigate();

  function handleDashboard() {
    navigate(`/`);
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              onClick={handleDashboard}
            >
              {open && (
                <Logo className="w-[120px]" />
              )}
              {!open && (
                <IconLogo className="h-[29px]" />
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
