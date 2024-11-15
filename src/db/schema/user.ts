import { relations } from "drizzle-orm";
import { date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import students from "./student";
import { teacher } from ".";

const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().default(""),
  lastName: text("last_name").notNull().default(""),
  birthDate: date("birth_date"),
  role: text("role").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  sex: text("sex"),
});

export const usersRelations = relations(users, ({ one }) => ({
  student: one(students, {
    fields: [users.id],
    references: [students.userId],
  }),
  teacher: one(teacher, {
    fields: [users.id],
    references: [teacher.userId],
  }),
}));

export default users;
