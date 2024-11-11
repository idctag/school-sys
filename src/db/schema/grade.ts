import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import lessons from "./lesson";
import students from "./student";

const grades = pgTable("grade", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  score: text("score"),
  lessonId: text("lessonId").references(() => lessons.id),
  studentId: text("studentId").references(() => students.id),
});

export const gradeRelations = relations(grades, ({ one }) => ({
  student: one(students, {
    fields: [grades.studentId],
    references: [students.id],
  }),
  lesson: one(lessons, {
    fields: [grades.lessonId],
    references: [lessons.id],
  }),
}));

export default grades;
