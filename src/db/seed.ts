import { db } from "@/db";
import * as schema from "@/db/schema";
import * as seeds from "./seeds";

async function deleteAllTables() {
  await Promise.all([
    db.delete(schema.user),
    db.delete(schema.student),
    db.delete(schema.teacher),
    db.delete(schema.accounts),
    db.delete(schema.classes),
    db.delete(schema.grade),
    db.delete(schema.lesson),
    db.delete(schema.session),
  ]);
}
async function main() {
  await deleteAllTables();

  await seeds.teacher();
  await seeds.classes();
  await seeds.lesson();
  await seeds.student();
}

main();
