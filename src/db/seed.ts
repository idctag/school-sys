import { db } from "@/db";
import * as schema from "@/db/schema";
import * as seeds from "./seeds";

// import { getTableName, sql, Table } from "drizzle-orm";
// async function resetTable(db: db, table: Table) {
//   return db.execute(
//     sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
//   );
// }

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
    db.delete(schema.event),
    db.delete(schema.attendance),
  ]);
}
async function main() {
  await deleteAllTables();

  await seeds.teacher();
  await seeds.classes();
  await seeds.lesson();
  await seeds.student();
  await seeds.event();
}

main();
