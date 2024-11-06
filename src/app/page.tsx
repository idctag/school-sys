import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  if (session) {
    redirect(`/${session.user.role}`);
  } else {
    redirect("/api/auth/signin");
  }
};

export default Home;
