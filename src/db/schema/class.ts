import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import teachers from "./teacher";
import students from "./student";

const classes = pgTable("class", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  teacherId: text("teacherId").references(() => teachers.id),
});

export const classRelations = relations(classes, ({ many, one }) => ({
  students: many(students),
  teacher: one(teachers, {
    fields: [classes.teacherId],
    references: [teachers.id],
  }),
}));

export default classes;
