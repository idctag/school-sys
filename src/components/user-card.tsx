import { db } from "@/db";
import { classes, student, teacher } from "@/db/schema";
import { count } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const UserCard = async ({
  type,
}: {
  type: "teacher" | "student" | "class";
}) => {
  const modelMap: Record<typeof type, any> = {
    student: student,
    teacher: teacher,
    class: classes,
  };
  const len = await db.select({ count: count() }).from(modelMap[type]);

  return (
    <Card className="min-w-52 flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{`${type}`}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{len[0].count}</div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
