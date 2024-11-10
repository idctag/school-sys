"use server";

import { teacherSchema } from "@/schemas";
import { db } from "..";
import users from "../schemas/user";
import { z } from "zod";
import { teacher } from "../schemas";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createTeacher = async (values: z.infer<typeof teacherSchema>) => {
  const newUser = await db
    .insert(users)
    .values({ ...values, role: "teacher" })
    .returning();
  if (!newUser) {
    throw new Error("failed to create user");
  }

  console.log(newUser[0]);

  try {
    await db.insert(teacher).values({
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
    .from(teacher)
    .where(eq(teacher.userId, newUser[0].id));

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
