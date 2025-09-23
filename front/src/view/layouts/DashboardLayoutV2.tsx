import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "../components/app-sidebar";
import { BreadcrumbContainerChecklists } from "../components/breadcrumbs/BreadcrumbContainerChecklists";
import { BreadcrumbContainerHelp } from "../components/breadcrumbs/BreadcrumbContainerHelp";
import { BreadcrumbContainerMessages } from "../components/breadcrumbs/BreadcrumbContainerMessages";
import { BreadcrumbContainerProject } from "../components/breadcrumbs/BreadcrumbContainerProject";
import { BreadcrumbContainerUser } from "../components/breadcrumbs/BreadcrumbContainerUser";
import { BreadcrumbDashV2 } from "../components/breadcrumbs/dashboard/BreadcrumbDashV2";
import { Separator } from "../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";

export function DashboardLayoutV2() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {(location.pathname === "/" || location.pathname === "/concluidos") && <BreadcrumbDashV2 />}

            <BreadcrumbContainerUser />
            <BreadcrumbContainerProject />
            <BreadcrumbContainerChecklists />
            <BreadcrumbContainerHelp />
            <BreadcrumbContainerMessages />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-sidebar">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
