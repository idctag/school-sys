import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  date,
  uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  lastName: text("last_name"),
  birthDate: date("birth_date"),
  role: text("role").notNull().default("user"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const students = pgTable("student", {
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

export const teachers = pgTable("teacher", {
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

export const classes = pgTable("class", {
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
export const lessons = pgTable("lesson", {
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

export const grades = pgTable("grade", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  score: text("score"),
  lessonId: text("lessonId"),
  studentId: text("studentId"),
});

export const gradeRelations = relations(grades, ({ one }) => ({
  student: one(students, {
    fields: [grades.studentId],
    references: [students.id],
  }),
  lesson: one(lessons, {
    fields: [grades.lessonId],
    references: [lessons.id],
  }),
}));

// RELATION TABLES
export const studentsToLessons = pgTable(
  "students_to_lessons",
  {
    studentId: text("student_id")
      .notNull()
      .references(() => students.id),
    lessonId: text("lesson_id")
      .notNull()
      .references(() => lessons.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.lessonId, t.studentId] }),
  }),
);

export const studentsToLessonsRelations = relations(
  studentsToLessons,
  ({ one }) => ({
    student: one(students, {
      fields: [studentsToLessons.studentId],
      references: [students.id],
    }),
    lessson: one(lessons, {
      fields: [studentsToLessons.lessonId],
      references: [lessons.id],
    }),
  }),
);

// AUTHORIZATION
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});
