import { DataTable } from "./data-table";
import { columns } from "./columns";

const StudentList = () => {
  return (
    <div>
      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default StudentList;
