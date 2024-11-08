import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import teachers from "./teacher";
import studentsToLessons from "./students_to_lesson";

const lessons = pgTable("lesson", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  teacherId: text("teacherId"),
  start: date("start").notNull(),
  end: date("end").notNull(),
});

export const lessonRelations = relations(lessons, ({ one, many }) => ({
  teacher: one(teachers, {
    fields: [lessons.teacherId],
    references: [teachers.id],
  }),
  studentsToLessons: many(studentsToLessons),
}));

export default lessons;
