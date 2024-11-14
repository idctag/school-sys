import { generateUsers } from "./user";
import { db } from "..";
import { teacher, user } from "../schema";
import { insertUserType } from "../../../types/userTypes";

const users: insertUserType[] = generateUsers(20);

export default async function seed() {
  users.map(async (current) => {
    const newUser = await db
      .insert(user)
      .values({ ...current.user, role: "teacher" })
      .returning();
    await db.insert(teacher).values({ ...current, userId: newUser[0].id });
  });
}
