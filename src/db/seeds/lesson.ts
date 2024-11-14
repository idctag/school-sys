import dayjs from "dayjs";
import { db } from "..";
import { lesson } from "../schema";
const data: (typeof lesson.$inferInsert)[] = [
  {
    name: "Math",
    day: "Monday",
    start: dayjs().hour(9).minute(0).format("HH:mm"),
    end: dayjs().hour(10).minute(30).format("HH:mm"),
  },
  {
    name: "English",
    day: "Monday",
    start: dayjs().hour(10).minute(40).format("HH:mm"),
    end: dayjs().hour(12).minute(10).format("HH:mm"),
  },
  {
    name: "Sport",
    day: "Monday",
    start: dayjs().hour(12).minute(20).format("HH:mm"),
    end: dayjs().hour(13).minute(50).format("HH:mm"),
  },
  {
    name: "Math",
    day: "Tuesday",
    start: dayjs().hour(9).minute(0).format("HH:mm"),
    end: dayjs().hour(10).minute(30).format("HH:mm"),
  },
  {
    name: "English",
    day: "Tuesday",
    start: dayjs().hour(10).minute(40).format("HH:mm"),
    end: dayjs().hour(12).minute(10).format("HH:mm"),
  },
  {
    name: "Sport",
    day: "Tuesday",
    start: dayjs().hour(12).minute(20).format("HH:mm"),
    end: dayjs().hour(13).minute(50).format("HH:mm"),
  },
  {
    name: "Math",
    day: "Wednesday",
    start: dayjs().hour(9).minute(0).format("HH:mm"),
    end: dayjs().hour(10).minute(30).format("HH:mm"),
  },
  {
    name: "English",
    day: "Wednesday",
    start: dayjs().hour(10).minute(40).format("HH:mm"),
    end: dayjs().hour(12).minute(10).format("HH:mm"),
  },
  {
    name: "Sport",
    day: "Wednesday",
    start: dayjs().hour(12).minute(20).format("HH:mm"),
    end: dayjs().hour(13).minute(50).format("HH:mm"),
  },
  {
    name: "Math",
    day: "Thursday",
    start: dayjs().hour(9).minute(0).format("HH:mm"),
    end: dayjs().hour(10).minute(30).format("HH:mm"),
  },
  {
    name: "English",
    day: "Thursday",
    start: dayjs().hour(10).minute(40).format("HH:mm"),
    end: dayjs().hour(12).minute(10).format("HH:mm"),
  },
  {
    name: "Sport",
    day: "Thursday",
    start: dayjs().hour(12).minute(20).format("HH:mm"),
    end: dayjs().hour(13).minute(50).format("HH:mm"),
  },
  {
    name: "Math",
    day: "Tuesday",
    start: dayjs().hour(9).minute(0).format("HH:mm"),
    end: dayjs().hour(10).minute(30).format("HH:mm"),
  },
  {
    name: "English",
    day: "Tuesday",
    start: dayjs().hour(10).minute(40).format("HH:mm"),
    end: dayjs().hour(12).minute(10).format("HH:mm"),
  },
  {
    name: "Sport",
    day: "Tuesday",
    start: dayjs().hour(12).minute(20).format("HH:mm"),
    end: dayjs().hour(13).minute(50).format("HH:mm"),
  },
];

export default async function seed() {
  const classesData = await db.query.classes.findMany();
  const teachersData = await db.query.teacher.findMany();
  await Promise.all(
    data.map(async (current, index) => {
      await db.insert(lesson).values({
        ...current,
        classId: classesData[index % 12].id,
        teacherId: teachersData[index % 12].id,
      });
    }),
  );
}
