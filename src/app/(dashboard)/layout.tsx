import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NavBar from "./_components/NavBar";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashbBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }

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
