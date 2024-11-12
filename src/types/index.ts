import { student, teacher, user } from "@/db/schema";

// TEACHER
export type insertTeacherType = typeof teacher.$inferInsert &
  typeof user.$inferInsert;

export type getTeacherType = typeof teacher.$inferSelect & {
  user: typeof user.$inferSelect;
};

export type updateTeacherType = Omit<typeof teacher.$inferInsert, "userId"> &
  typeof user.$inferInsert;

// STUDENT

export type insertStudentType = typeof student.$inferInsert &
  typeof user.$inferInsert;

export type getStudentType = typeof student.$inferSelect & {
  user: typeof user.$inferSelect;
};

export type updateStudentType = Omit<typeof student.$inferSelect, "userId"> &
  typeof user.$inferSelect;
