import { insertStudentType } from "@/types";
import { generateUsers } from "./user";
import { db } from "..";
import { student, user } from "../schema";

const users: Omit<insertStudentType, "userId">[] = generateUsers(100);

export default async function seed() {
  users.map(async (current) => {
    const newUser = await db
      .insert(user)
      .values({ ...current, role: "student" })
      .returning();
    await db.insert(student).values({ ...current, userId: newUser[0].id });
  });
}
