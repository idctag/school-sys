import { getTeachers } from "@/db/actions/teacher";
import { studentColumns, teacherColumns } from "./columns";
import { DataTable } from "./data-table";
import { getStudents } from "@/db/actions/student";

export const StudentList = async () => {
  const students = await getStudents();
  return (
    <div>
      <DataTable columns={studentColumns} data={students} />
    </div>
  );
};

export const TeacherList = async () => {
  const teachers = await getTeachers();
  return (
    <div>
      <DataTable columns={teacherColumns} data={teachers} />
    </div>
  );
};
