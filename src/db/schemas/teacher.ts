import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import lessons from "./lesson";
import classes from "./class";
import users from "./user";

const teachers = pgTable("teacher", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  classId: text("classId"),
});

export const teacherRelations = relations(teachers, ({ one, many }) => ({
  class: one(classes, {
    fields: [teachers.classId],
    references: [classes.id],
  }),
  lessons: many(lessons),
}));

export default teachers;
