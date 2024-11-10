import { studentColumns } from "./columns";
import { DataTable } from "./data-table";
import { getStudents } from "@/db/actions/student";

const StudentList = async () => {
  const students = await getStudents();
  return (
    <div>
      <DataTable columns={studentColumns} data={students} />
    </div>
  );
};

export default StudentList;
