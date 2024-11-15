"use client";
import { Book, Calendar, Component, University, User } from "lucide-react";

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
import { SignOut } from "./signout-button";
import { useSession } from "next-auth/react";

const items = {
  administration: [
    {
      title: "Users",
      url: "/list/users",
      icon: User,
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
  const { data: session } = useSession();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex">
        <SidebarMenu>
          <SidebarMenuItem className="flex">
            <SidebarMenuButton asChild>
              <Link href={`/${session?.user.role}`}>
                <University />
                <span>School System</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarMenu>
            {items.administration.map((item) => (
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SignOut />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
