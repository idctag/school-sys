import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NavBar from "./_components/NavBar";
import { Separator } from "@/components/ui/separator";

export default function DashbBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="size-12" />
      <div className="flex flex-col w-full">
        <NavBar />
        <Separator />
        {children}
      </div>
    </SidebarProvider>
  );
}
