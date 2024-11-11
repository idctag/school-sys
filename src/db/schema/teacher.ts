import { pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import users from "./user";
import classes from "./class";
import lessons from "./lesson";

const teachers = pgTable("teacher", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
});

export const teacherRelations = relations(teachers, ({ one, many }) => ({
  class: one(classes),
  lessons: many(lessons),
}));

export default teachers;
