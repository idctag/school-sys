import { auth } from "@/auth";
import { redirect } from "next/navigation";

const StudentDashboard = async () => {
  const session = await auth();
  if (session && session.user.role != "student") {
    redirect(`/${session.user.role}`);
  }
  return (
    <div className="p-4 gap-4 flex flex-col xl:flex-row">StudentDashboard</div>
  );
};

export default StudentDashboard;
