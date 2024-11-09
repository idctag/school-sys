"use server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { studentSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import users from "../schemas/user";
import students from "../schemas/student";
import { db } from "..";

export const createStudent = async (values: z.infer<typeof studentSchema>) => {
  console.log(values);
  const newUser = await db
    .insert(users)
    .values({ ...values, role: "student" })
    .returning();
  if (!newUser) {
    throw new Error("failed to create user");
  }

  console.log(newUser[0]);

  try {
    await db.insert(students).values({
      userId: newUser[0].id,
      classId: null,
    });
  } catch (e) {
    await db.delete(users).where(eq(users.id, newUser[0].id));
    return {
      error: e,
    };
  }
  const student = db
    .select()
    .from(students)
    .where(eq(students.userId, newUser[0].id));

  revalidatePath("/");
  return student;
};

export const getStudents = async () => {
  const data = await db.select().from(users).where(eq(users.role, "student"));
  return data;
};

export const deleteUser = async (id: string) => {
  const student = await db.delete(users).where(eq(users.id, id));
  revalidatePath("/");
  return JSON.stringify(student);
};
