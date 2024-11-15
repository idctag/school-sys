import { getUsers } from "@/db/actions/user";
import { DataTable } from "./data-table";
import { userColumns } from "./columns";

export const UserList = async () => {
  const users = await getUsers();
  return (
    <div>
      <DataTable columns={userColumns} data={users} />
    </div>
  );
};
