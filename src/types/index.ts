import { student, teacher, user } from "@/db/schema";

export type insertTeacherType = typeof teacher.$inferInsert &
  typeof user.$inferInsert;

export type updateTeacherType = typeof teacher.$inferSelect & {
  user: typeof user.$inferSelect;
};

export type insertStudentType = typeof student.$inferInsert &
  typeof user.$inferInsert;

export type updateStudentType = typeof student.$inferSelect & {
  user: typeof user.$inferSelect;
};
