"use server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "..";
import { user } from "../schema";

export const deleteUser = async (id: string) => {
  const deleted = await db.delete(user).where(eq(user.id, id)).returning();
  revalidatePath("/");
  return deleted;
};

export const createUser = async (
  values: typeof user.$inferInsert,
): Promise<typeof user.$inferSelect> => {
  try {
    await db.insert(user).values(values);
  } catch (e) {
    throw new Error(`${e}`);
  }

  const newUser = await db.query.user.findFirst({
    where: eq(user.email, values.email),
  });

  if (!newUser) {
    throw new Error("failed to create user");
  }

  return newUser;
};
