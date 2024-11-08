import { date, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  lastName: text("last_name"),
  birthDate: date("birth_date"),
  role: text("role").notNull().default("user"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export default users;
