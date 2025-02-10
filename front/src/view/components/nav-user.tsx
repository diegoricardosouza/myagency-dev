import {
  ChevronsUpDown,
  LogOut,
  UserRoundPen
} from "lucide-react"

import { useAuth } from "@/app/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import {
  Avatar,
  AvatarFallback
} from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar"

export function NavUser() {
  const { isMobile } = useSidebar();
  const { signout, user } = useAuth();
  const navigate = useNavigate();

  function handleMyProfile() {
    navigate(`/perfil`)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={user.logo} alt={user.name} /> */}
                <AvatarFallback className="rounded-lg">
                  {user?.data.corporate_name.charAt(0).toLocaleUpperCase()}
                  {user?.data.corporate_name.charAt(1).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.data.corporate_name}</span>
                <span className="truncate text-xs">{user?.data.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.logo} alt={user.name} /> */}
                  <AvatarFallback className="rounded-lg">
                    {user?.data.corporate_name.charAt(0).toLocaleUpperCase()}
                    {user?.data.corporate_name.charAt(1).toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.data.corporate_name}</span>
                  <span className="truncate text-xs">{user?.data.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={handleMyProfile} className="cursor-pointer">
                <UserRoundPen size={17} />
                Meu Perfil
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={signout} className="cursor-pointer">
              <LogOut size={16} />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
