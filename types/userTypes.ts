import { student, teacher, user } from "@/db/schema";

// USER

export type insertUserType = {
  user: typeof user.$inferInsert;
  student?: typeof student.$inferInsert;
  teacher?: typeof teacher.$inferInsert;
};

export type getUserType = typeof user.$inferSelect & {
  student: typeof student.$inferSelect;
  teacher: typeof teacher.$inferSelect;
};
