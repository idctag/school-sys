"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function SignOut() {
  return (
    <Button
      variant="ghost"
      className="text-red-400 w-full"
      onClick={() => signOut()}
    >
      Sign Out
      <LogOut />
    </Button>
  );
}
