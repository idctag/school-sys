import { getTeachers } from "@/db/actions/teachers";
import { DataTable } from "./data-table";
import { teacherColumns } from "./columns";

const TeacherList = async () => {
  const teachers = await getTeachers();
  return (
    <div>
      <DataTable columns={teacherColumns} data={teachers} />
    </div>
  );
};

export default TeacherList;
