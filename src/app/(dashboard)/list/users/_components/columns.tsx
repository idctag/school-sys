"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteUser } from "@/db/actions/user";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getUserType } from "../../../../../../types/userTypes";
import EditUserForm from "@/app/(dashboard)/_components/forms/EditUserForm";

const handleDelete = async (id: string) => {
  const res = await deleteUser(id);
  if (res.status && res.message) {
    toast.warning(`${res.message} Deleted`);
  } else {
    toast.error("Could not delete user");
  }
};

export const userColumns: ColumnDef<getUserType>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original;
      return <Badge>{user.role}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Dialog>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DialogTrigger asChild>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <AlertDialogTrigger className="text-red-500 w-full">
                    delete
                  </AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update {user.name}</DialogTitle>
              </DialogHeader>
              <DialogDescription></DialogDescription>
              <EditUserForm data={user} />
            </DialogContent>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(user.id)}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Dialog>
      );
    },
  },
];
