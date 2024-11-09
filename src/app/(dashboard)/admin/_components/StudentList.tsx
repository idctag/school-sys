import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getStudents } from "@/db/actions/student";

const StudentList = async () => {
  const students = await getStudents();
  return (
    <div>
      <DataTable columns={columns} data={students} />
    </div>
  );
};

export default StudentList;
