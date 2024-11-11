import { DataTable } from "./data-table";
import { teacherColumns } from "./columns";
import { getTeachers } from "@/db/actions/teacher";

const TeacherList = async () => {
  const teachers = await getTeachers();
  return (
    <div>
      <DataTable columns={teacherColumns} data={teachers} />
    </div>
  );
};

export default TeacherList;
