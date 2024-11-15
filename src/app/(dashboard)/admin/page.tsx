import CountChart from "@/components/count-chart";
import UserCard from "@/components/user-card";
import { db } from "@/db";
import { user } from "@/db/schema";
import { and, count, eq } from "drizzle-orm";

const AdminDashboard = async () => {
  const maleCount = (
    await db
      .select({ count: count() })
      .from(user)
      .where(and(eq(user.role, "student"), eq(user.sex, "male")))
  )[0].count;
  const femaleCount = (
    await db
      .select({ count: count() })
      .from(user)
      .where(and(eq(user.role, "student"), eq(user.sex, "female")))
  )[0].count;
  const chartData = [
    {
      type: "total",
      count: maleCount + femaleCount,
      fill: "var(--color-chrome)",
    },
    {
      type: "female",
      count: femaleCount,
      fill: "#a21caf",
    },
    {
      type: "male",
      count: maleCount,
      fill: "#1e40af",
    },
  ];
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="class" />
        </div>
        {/* Middle charts */}
        <div className="flex gap-4 flex-col lg:flex-row h-[450px]">
          <div className="w-full lg:w-1/3">
            <CountChart
              data={chartData}
              male={maleCount}
              female={femaleCount}
            />
          </div>
          <div className="w-full lg:w-2/3">
            {/* <CountChart data={chartData} /> */}
          </div>
        </div>
      </div>
      {/* RIGHT  */}
      <div className="w-full lg:w-1/3">right</div>
    </div>
  );
};

export default AdminDashboard;
