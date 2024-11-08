import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import users from "./user";
import classes from "./class";
import studentsToLessons from "./students_to_lesson";
import grades from "./grade";

const students = pgTable("student", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  classId: text("classId"),
});

export const studentRelations = relations(students, ({ one, many }) => ({
  class: one(classes, {
    fields: [students.classId],
    references: [classes.id],
  }),
  studentsToLessons: many(studentsToLessons),
  grades: many(grades),
}));

export default students;
