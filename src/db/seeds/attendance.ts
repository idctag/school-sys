import { db } from "..";
import attendance from "../schema/attendance";

export default async function seed() {
  const studentsData = await db.query.student.findMany({ limit: 10 });
  const lessonData = await db.query.lesson.findMany({ limit: 10 });
  for (let i = 1; i <= 10; i++) {
    await db.insert(attendance).values({
      date: new Date(),
      present: true,
      studentId: studentsData[i].id,
      lessonId: lessonData[i].id,
    });
  }
}
