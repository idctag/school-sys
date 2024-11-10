import { auth } from "@/auth";
import { redirect } from "next/navigation";

const TeacherDashboard = async () => {
  const session = await auth();
  if (session && session.user.role != "teacher") {
    redirect(`/${session.user.role}`);
  }
  return <div>TeacherDashboard</div>;
};

export default TeacherDashboard;
