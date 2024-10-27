import {
  Backpack,
  Book,
  Calendar,
  Component,
  Notebook,
  SquareTerminal,
  University,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = {
  dashboard: [
    {
      title: "Admin",
      url: "/admin",
      icon: SquareTerminal,
    },
    {
      title: "Teacher",
      url: "/teacher",
      icon: Notebook,
    },
    {
      title: "Student",
      url: "/student",
      icon: Backpack,
    },
  ],
  academic: [
    {
      title: "Classes",
      url: "/list/class",
      icon: Component,
    },
    {
      title: "Lessons",
      url: "/list/lesson",
      icon: Book,
    },
    {
      title: "Events",
      url: "/list/events",
      icon: Calendar,
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex">
        <SidebarMenu>
          <SidebarMenuItem className="flex">
            <SidebarMenuButton asChild>
              <Link href="#">
                <University />
                <span>School System</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
          <SidebarMenu>
            {items.dashboard.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Academic</SidebarGroupLabel>
          <SidebarMenu>
            {items.academic.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
