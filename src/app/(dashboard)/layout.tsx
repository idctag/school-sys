import { Separator } from "@/components/ui/separator";
import NavBar from "./_components/NavBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout({
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
