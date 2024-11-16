import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { lesson, student } from ".";

const attendance = pgTable("attendance", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  date: timestamp("date"),
  present: boolean("present"),
  studentId: text("studentId").references(() => student.id),
  lessonId: text("lessonId").references(() => lesson.id),
});

export const attendanceRelations = relations(attendance, ({ one }) => ({
  student: one(student, {
    fields: [attendance.studentId],
    references: [student.id],
  }),
  lesson: one(lesson, {
    fields: [attendance.lessonId],
    references: [lesson.id],
  }),
}));

export default attendance;
