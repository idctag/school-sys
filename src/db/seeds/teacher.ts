import { generateUsers } from "./user";
import { db } from "..";
import { teacher, user } from "../schema";
import { insertUserType } from "../../../types/userTypes";

export default async function seed() {
  const users: insertUserType[] = generateUsers(12);
  await Promise.all(
    users.map(async (current) => {
      const newUser = await db
        .insert(user)
        .values({ ...current.user, role: "teacher" })
        .returning();
      await db
        .insert(teacher)
        .values({ ...current.teacher, userId: newUser[0].id });
    }),
  );
}
