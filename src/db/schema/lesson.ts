import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import teachers from "./teacher";
import classes from "./class";

const lessons = pgTable("lesson", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  teacherId: text("teacherId").references(() => teachers.id),
  classId: text("classId").references(() => classes.id),
  day: text("day").notNull(),
  start: text("start").notNull(),
  end: text("end").notNull(),
});

export const lessonRelations = relations(lessons, ({ one }) => ({
  teacher: one(teachers, {
    fields: [lessons.teacherId],
    references: [teachers.id],
  }),
  class: one(classes, {
    fields: [lessons.classId],
    references: [classes.id],
  }),
}));

export default lessons;
