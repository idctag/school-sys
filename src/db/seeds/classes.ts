import { db } from "..";
import { classes } from "../schema";

const data = [
  {
    name: "1A",
  },
  {
    name: "2A",
  },
  {
    name: "3A",
  },
  {
    name: "4A",
  },
  {
    name: "1B",
  },
  {
    name: "2B",
  },
  {
    name: "3B",
  },
  {
    name: "4B",
  },
  {
    name: "1C",
  },
  {
    name: "2C",
  },
  {
    name: "3C",
  },
  {
    name: "4C",
  },
];

export default async function seed() {
  const teachersList = await db.query.teacher.findMany();
  await Promise.all(
    data.map(async (current, index) => {
      await db
        .insert(classes)
        .values({ ...current, teacherId: teachersList[index % 12].id });
    }),
  );
}
