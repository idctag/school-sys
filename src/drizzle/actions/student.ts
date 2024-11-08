"use server";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { students, users } from "../schema";
import { z } from "zod";
import { studentSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export const createStudent = async (values: z.infer<typeof studentSchema>) => {
  console.log(values);
  const newUser = await db.insert(users).values({ ...values, role: "student" });
  if (!newUser) {
    throw new Error("failed to create user");
  }
  const user = (
    await db.select().from(users).where(eq(users.email, values.email))
  )[0];
  const student = await db.insert(students).values({
    userId: user.id,
    classId: null,
  });
  if (!student) {
    await db.delete(users).where(eq(users.email, values.email));
  }
  revalidatePath("/");
  return JSON.stringify(student);
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
