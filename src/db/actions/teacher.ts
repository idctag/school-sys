"use server";

import { db } from "..";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import users from "../schema/user";
import teachers from "../schema/teacher";
import { createUser } from "./user";
import { teacher, user } from "../schema";
import { updateTeacherType } from "@/types";

export const createTeacher = async (
  values: Omit<typeof teacher.$inferInsert, "userId"> &
    typeof user.$inferInsert,
) => {
  const newUser = await createUser({ ...values, role: "teacher" });

  try {
    await db.insert(teachers).values({
      userId: newUser.id,
    });
  } catch (e) {
    await db.delete(users).where(eq(users.id, newUser.id));
    return {
      error: e,
    };
  }

  const newTeacher = await db.query.teacher.findFirst({
    where: eq(teacher.userId, newUser.id),
  });

  revalidatePath("/");
  return newTeacher;
};

export const getTeachers = async () => {
  const teachers = await db.query.teacher.findMany({ with: { user: true } });
  return teachers;
};

export const updateTeacher = async (id: string, data: updateTeacherType) => {
  try {
    const update = await db.query.teacher.findFirst({
      where: eq(teacher.id, id),
      with: { user: true },
    });
    if (update) {
      await db
        .update(user)
        .set({ ...data })
        .where(eq(user.id, update.user.id));
    }
  } catch (err) {
    return {
      error: err,
    };
  }
  const updatedData = await db.query.teacher.findFirst({
    where: eq(teacher.id, id),
    with: { user: true },
  });
  revalidatePath("/");
  return updatedData;
};
