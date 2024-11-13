"use server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "..";
import { student, teacher, user } from "../schema";
import { createUserType, getUserType } from "@/types";

export const getUsers = async () => {
  const res = await db.query.user.findMany({
    with: { student: true, teacher: true },
  });
  return res;
};

export const deleteUser = async (id: string) => {
  try {
    const res = await db
      .delete(user)
      .where(eq(user.id, id))
      .returning({ email: user.email });
    revalidatePath("/");
    return { status: true, message: res[0].email };
  } catch (err) {
    return { message: err, status: false };
  }
};

export const updateUser = async (id: string, data: getUserType) => {
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(user)
        .set({ ...data })
        .where(eq(user.id, id));
      await tx
        .update(student)
        .set({ ...data })
        .where(eq(student.userId, id));
      await tx
        .update(teacher)
        .set({ ...data })
        .where(eq(teacher.userId, id));
    });
  } catch (e) {
    throw new Error(`${e}`);
  }
  const updatedUser = await db.query.user.findFirst({
    where: eq(user.id, id),
    with: { student: true, teacher: true },
  });

  return updatedUser;
};

export const createUser = async (values: createUserType) => {
  try {
    const newUser = await db.insert(user).values(values.user).returning();
    switch (values.user.role) {
      case "student":
        await db.insert(student).values({ userId: newUser[0].id });
        break;
      case "teacher":
        await db.insert(teacher).values({ userId: newUser[0].id });
        break;
    }
    if (values.student) {
      await db.update(student).set(values.student);
    }
    if (values.teacher) {
      await db.update(teacher).set(values.teacher);
    }
    revalidatePath("/");
  } catch (e) {
    throw new Error(`${e}`);
  }

  const newUser = await db.query.user.findFirst({
    where: eq(user.email, values.user.email),
  });

  if (!newUser) {
    throw new Error("failed to create user");
  }

  return newUser;
};
