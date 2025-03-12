import {
  CircleHelp,
  LayoutDashboard,
  PanelsTopLeft,
  Settings2,
  Users
} from "lucide-react"
import * as React from "react"

import { useAuth } from "@/app/hooks/useAuth"
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
      isActive: true,
      items: [
        {
          title: "Projetos em Andamento",
          url: "/",
        },
        {
          title: "Projetos Concluídos",
          url: "/concluidos",
        }
      ],
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

const dataClient = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Projetos em Andamento",
          url: "/",
        },
        {
          title: "Projetos Concluídos",
          url: "/concluidos",
        }
      ],
    },
    {
      title: "Quero Ajuda",
      url: "/ajuda",
      icon: CircleHelp,
      isActive: false,
      items: [
        {
          title: "Ajuda",
          url: "/ajuda",
        }
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {user?.data.level === 'ADMIN' && (
          <NavMain items={data.navMain} />
        )}

        {user?.data.level === 'CLIENTE' && (
          <NavMain items={dataClient.navMain} />
        )}
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
