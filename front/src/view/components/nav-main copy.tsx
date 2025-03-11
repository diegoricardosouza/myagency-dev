import { ChevronRight, type LucideIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "./ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string | null>(null)

  // Verifica o item ativo inicial baseado na URL
  useEffect(() => {
    const activeParent = items.find(item =>
      item.items &&
      item.items.some(subItem =>
        location.pathname === subItem.url ||
        location.pathname.startsWith(`${subItem.url}/`)
      )
    );
    setActiveItem(activeParent?.title || null);
  }, [items, location.pathname]);

  const handleToggle = (title: string) => {
    setActiveItem(prev => prev === title ? null : title);
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActiveParent = activeItem === item.title;
          const hasItems = item.items && item.items.length > 0;

          return (
            <React.Fragment key={item.title}>
              {hasItems ? (
                <Collapsible
                  asChild
                  open={isActiveParent}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={() => handleToggle(item.title)}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const menuActive = String(subItem.url) === String(location.pathname)
                            || location.pathname.startsWith(`${subItem.url}/edit`) || location.pathname.startsWith(`${subItem.url}/detalhes`)

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={menuActive}>
                                <Link to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title} onClick={() => handleToggle(item.title)}>
                  <SidebarMenuButton asChild isActive={isActiveParent} tooltip={item.title}>
                    <Link to={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </React.Fragment>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
