"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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

  const isItemActive = (itemUrl: string, customActive?: boolean) =>
    customActive ||
    location.pathname === itemUrl ||
    location.pathname.startsWith(`${itemUrl}/`)

  const handleToggle = (title: string) => {
    setActiveItem((prev) => (prev === title ? null : title))
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const defaultIsActive = isItemActive(item.url, item.isActive)

          const collapsibleProps =
            activeItem === null
              ? { defaultOpen: defaultIsActive }
              : { open: activeItem === item.title }

          return (
            <Collapsible
              key={item.title}
              asChild
              {...collapsibleProps}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild onClick={() => handleToggle(item.title)}>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const menuActive = String(subItem.url) === String(location.pathname) || location.pathname.startsWith(`${subItem.url}/edit`)

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
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
