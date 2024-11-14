"use server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "..";
import { student, teacher, user } from "../schema";
import { insertUserType } from "@/types";

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

export const createUser = async (values: insertUserType) => {
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
    return { status: true };
  } catch (err) {
    return { status: false, message: err };
  }
};
export const updateUser = async (id: string, data: insertUserType) => {
  try {
    await db.update(user).set(data.user).where(eq(user.id, id));
    if (data.student) {
      await db.update(student).set(data.student).where(eq(student.userId, id));
    }
    if (data.teacher) {
      await db.update(teacher).set(data.teacher).where(eq(teacher.userId, id));
    }
    revalidatePath("/");
    return { status: true };
  } catch (err) {
    return { status: false, message: err };
  }
};
