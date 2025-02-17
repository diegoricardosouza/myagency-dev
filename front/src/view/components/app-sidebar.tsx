import {
  BookOpen,
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
      title: "Projetos",
      url: "/projetos",
      icon: PanelsTopLeft,
      isActive: true,
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
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
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
