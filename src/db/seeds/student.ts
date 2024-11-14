import { generateUsers } from "./user";
import { db } from "..";
import { student, user } from "../schema";
import { insertUserType } from "../../../types/userTypes";

const users: insertUserType[] = generateUsers(100);

export default async function seed() {
  users.map(async (current) => {
    const newUser = await db
      .insert(user)
      .values({ ...current.user, role: "student" })
      .returning();
    await db.insert(student).values({ ...current, userId: newUser[0].id });
  });
}
