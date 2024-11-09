import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import students from "./student";
import lessons from "./lesson";

const studentsToLessons = pgTable(
  "students_to_lessons",
  {
    studentId: text("studentId")
      .notNull()
      .references(() => students.id),
    lessonId: text("lessonId")
      .notNull()
      .references(() => lessons.id),
  },
  (t) => [{ pk: primaryKey({ columns: [t.lessonId, t.studentId] }) }],
);

export const studentsToLessonsRelations = relations(
  studentsToLessons,
  ({ one }) => ({
    student: one(students, {
      fields: [studentsToLessons.studentId],
      references: [students.id],
    }),
    lessson: one(lessons, {
      fields: [studentsToLessons.lessonId],
      references: [lessons.id],
    }),
  }),
);

export default studentsToLessons;
