import { relations } from "drizzle-orm";
import { classes } from ".";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

const event = pgTable("event", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  start: timestamp("start").notNull(),
  end: timestamp("end").notNull(),
  classId: text("classId").references(() => classes.id),
});

export const eventRelations = relations(event, ({ one }) => ({
  classes: one(classes, {
    fields: [event.classId],
    references: [classes.id],
  }),
}));

export default event;
