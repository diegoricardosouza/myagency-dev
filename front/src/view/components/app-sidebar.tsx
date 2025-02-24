import {
  LayoutDashboard,
  PanelsTopLeft,
  Settings2,
  Users
} from "lucide-react"
import * as React from "react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true
    },
    {
      title: "Projetos",
      url: "/projetos",
      icon: PanelsTopLeft,
      isActive: false,
      items: [
        {
          title: "Listar Todos",
          url: "/projetos",
        },
        {
          title: "Adicionar Novo",
          url: "/projetos/novo",
        }
      ],
    },
    {
      title: "Usuários",
      url: "/usuarios",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "Listar Todos",
          url: "/usuarios",
        },
        {
          title: "Adicionar Novo",
          url: "/usuarios/novo",
        }
      ],
    },
    {
      title: "Configurações",
      url: "/configuracoes",
      icon: Settings2,
      isActive: false,
      items: [
        {
          title: "Checklists",
          url: "/configuracoes/checklists",
        }
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
