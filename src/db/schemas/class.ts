import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import students from "./student";
import teachers from "./teacher";

const classes = pgTable("class", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  teacherId: text("teacherId"),
});

export const classRelations = relations(classes, ({ many, one }) => ({
  students: many(students),
  teacher: one(teachers, {
    fields: [classes.teacherId],
    references: [teachers.id],
  }),
}));

export default classes;