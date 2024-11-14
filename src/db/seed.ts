import * as schema from "@/db/schema";
import { db } from "@/db";
import * as seeds from "./seeds";

async function main() {
  for (const table of [
    schema.user,
    schema.student,
    schema.teacher,
    schema.accounts,
    schema.class,
    schema.grade,
    schema.lesson,
    schema.session,
  ]) {
    await db.delete(table);
  }
  await seeds.student();
  await seeds.teacher();
}

main();
