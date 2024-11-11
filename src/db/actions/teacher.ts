"use server";

import { db } from "..";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import users from "../schema/user";
import teachers from "../schema/teacher";

export const createTeacher = async (
  values: typeof users.$inferInsert & typeof teachers.$inferInsert,
) => {
  const newUser = await db
    .insert(users)
    .values({ ...values, role: "teacher" })
    .returning();
  if (!newUser) {
    throw new Error("failed to create user");
  }

  try {
    await db.insert(teachers).values({
      userId: newUser[0].id,
    });
  } catch (e) {
    await db.delete(users).where(eq(users.id, newUser[0].id));
    return {
      error: e,
    };
  }
  const student = db
    .select()
    .from(teachers)
    .where(eq(teachers.userId, newUser[0].id));

  revalidatePath("/");
  return student;
};

export const getTeachers = async () => {
  const teachers = await db
    .select()
    .from(users)
    .where(eq(users.role, "teacher"));
  return teachers;
};
