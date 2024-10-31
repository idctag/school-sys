"use client";

import { StudentTable } from "@/drizzle/schema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<typeof StudentTable.$inferSelect>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "classId",
    header: "Class id",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
