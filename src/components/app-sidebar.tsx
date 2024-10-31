"use client";
import { Book, Calendar, Component, LogOut, University } from "lucide-react";

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
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SignedIn, SignOutButton, useUser } from "@clerk/nextjs";

const items = {
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
  const { user } = useUser();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex">
        <SidebarMenu>
          <SidebarMenuItem className="flex">
            <SidebarMenuButton asChild>
              <Link href={`/${user?.publicMetadata.role}`}>
                <University />
                <span>School System</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
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
            <SignedIn>
              <SignOutButton>
                <Button
                  variant="ghost"
                  className="w-full justify-center text-red-500"
                >
                  Log Out
                  <Separator orientation="vertical" className="mx-3" />
                  <LogOut />
                </Button>
              </SignOutButton>
            </SignedIn>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
