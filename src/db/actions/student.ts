"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { createUser } from "./user";
import users from "../schema/user";
import { student, user } from "../schema";

export const createStudent = async (
  values: Omit<typeof student.$inferInsert, "userId"> &
    typeof users.$inferInsert,
) => {
  const newUser = await createUser({ ...values, role: "student" });

  try {
    await db.insert(student).values({
      ...values,
      userId: newUser.id,
    });
  } catch (e) {
    await db.delete(users).where(eq(users.id, newUser.id));
    return {
      error: e,
    };
  }
  const newStudent = await db.query.student.findFirst({
    where: eq(student.userId, newUser.id),
  });

  revalidatePath("/");
  return newStudent;
};

export const getStudents = async () => {
  const data = await db.query.student.findMany({ with: { user: true } });
  return data;
};

export const getStudent = async (id: string) => {
  const data = await db.query.student.findFirst({
    where: eq(student.id, id),
    with: { user: true },
  });
  return data;
};

export const updateStudent = async (
  id: string,
  data: Omit<typeof student.$inferInsert, "userId"> & typeof user.$inferInsert,
) => {
  try {
    const update = await db.query.student.findFirst({
      where: eq(student.id, id),
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
  const updatedData = await db.query.student.findFirst({
    where: eq(student.id, id),
    with: { user: true },
  });
  revalidatePath("/");
  return updatedData;
};
