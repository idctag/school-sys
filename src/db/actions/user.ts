"use server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "..";
import users from "../schema/user";

export const deleteUser = async (id: string) => {
  const student = await db.delete(users).where(eq(users.id, id));
  revalidatePath("/");
  return JSON.stringify(student);
};

export const createUser = async (
  values: typeof users.$inferInsert,
): Promise<typeof users.$inferSelect> => {
  try {
    await db.insert(users).values(values);
  } catch (e) {
    throw new Error(`${e}`);
  }

  const newUser = await db.query.user.findFirst({
    where: eq(users.email, values.email),
  });

  if (!newUser) {
    throw new Error("failed to create user");
  }

  return newUser;
};
