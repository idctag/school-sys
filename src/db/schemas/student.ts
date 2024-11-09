import { pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import users from "./user";
import classes from "./class";
import studentsToLessons from "./students_to_lesson";
import grades from "./grade";

const students = pgTable("student", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  classId: text("classId").references(() => classes.id),
});

export const studentRelations = relations(students, ({ one, many }) => ({
  class: one(classes, {
    fields: [students.classId],
    references: [classes.id],
  }),
  studentsToLessons: many(studentsToLessons),
  grades: many(grades),
  user: one(users, {
    fields: [students.userId],
    references: [users.id],
  }),
}));

export default students;
