import { generateUsers } from "./user";
import { db } from "..";
import { student, user } from "../schema";
import { insertUserType } from "../../../types/userTypes";

const users: insertUserType[] = generateUsers(100);

export default async function seed() {
  const classesData = await db.query.classes.findMany();
  await Promise.all(
    users.map(async (current, index) => {
      const newUser = await db
        .insert(user)
        .values({ ...current.user, role: "student" })
        .returning();
      await db.insert(student).values({
        ...current.student,
        userId: newUser[0].id,
        classId: classesData[index % 12].id,
      });
    }),
  );
}
