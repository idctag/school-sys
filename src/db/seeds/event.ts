import { db } from "..";
import { event } from "../schema";

const startTime = new Date();
const endTime = new Date();

const nextDay = new Date();
const nextEnd = nextDay;

nextDay.setDate(startTime.getDay() + 1);

const oneHourInMillis = 1000 * 60 * 60;
endTime.setTime(startTime.getTime() + oneHourInMillis);
nextEnd.setTime(nextEnd.getTime() + oneHourInMillis);

const data: (typeof event.$inferInsert)[] = [
  {
    title: "Graduation",
    description: "class graduation",
    start: startTime,
    end: endTime,
  },
  {
    title: "Presentation",
    description: "group presentations",
    start: nextDay,
    end: nextEnd,
  },
];

export default async function seed() {
  const classesData = await db.query.classes.findMany({ limit: 2 });
  await Promise.all(
    data.map(async (current, index) => {
      await db
        .insert(event)
        .values({ ...current, classId: classesData[index].id });
    }),
  );
}
