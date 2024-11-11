"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { createUser } from "./user";
import students from "../schema/student";
import users from "../schema/user";

export const createStudent = async (
  values: Omit<typeof students.$inferInsert, "userId"> &
    typeof users.$inferInsert,
) => {
  const newUser = await createUser({ ...values, role: "student" });

  try {
    await db.insert(students).values({
      ...values,
      userId: newUser.id,
    });
  } catch (e) {
    await db.delete(users).where(eq(users.id, newUser.id));
    return {
      error: e,
    };
  }

  revalidatePath("/");
};

export const getStudents = async () => {
  const data = await db.query.student.findMany({ with: { user: true } });
  return data;
};

export const getStudent = async (id: string) => {
  const data = await db.query.student.findFirst({
    where: eq(students.id, id),
    with: { user: true },
  });
  return data;
};

// export const updateStudent = async (
//   id: string,
//   values: z.infer<typeof studentSchema>,
// ) => {
//   const student = await db.select().from(students).where(eq(students.id, id));
//   const user = await db
//     .select()
//     .from(users)
//     .where(eq(users.id, student[0].userId));
//   try {
//     await db.update(users).set(values).where(eq(users.id, user[0].id));
//   } catch (e) {
//     return {
//       error: e,
//     };
//   }
//   revalidatePath("/");
// };
