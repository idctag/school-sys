import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { UserList } from "./_components/table";

const AdminDashboard = async () => {
  const session = await auth();
  if (session && session.user.role != "admin") {
    redirect(`/${session.user.role}`);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 my-4">
      <div className="col-span-3">
        <div className="flex place-content-end mb-4"></div>
        <UserList />
      </div>
    </div>
  );
};

export default AdminDashboard;
