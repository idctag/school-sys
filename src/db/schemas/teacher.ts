import { pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import lessons from "./lesson";
import users from "./user";
import classes from "./class";

const teachers = pgTable("teacher", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const teacherRelations = relations(teachers, ({ one, many }) => ({
  class: one(classes),
  lessons: many(lessons),
}));

export default teachers;
