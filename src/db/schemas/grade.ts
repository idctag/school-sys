import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import students from "./student";
import lessons from "./lesson";

const grades = pgTable("grade", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  score: text("score"),
  lessonId: text("lessonId"),
  studentId: text("studentId"),
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
