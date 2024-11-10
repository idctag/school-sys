import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentList from "./_components/StudentList";
import TeacherList from "./_components/TeacherList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { StudentForm } from "./_components/forms/StudentForm";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { TeacherForm } from "./_components/forms/TeacherForm";

const AdminDashboard = async () => {
  const session = await auth();
  if (session && session.user.role != "admin") {
    redirect(`/${session.user.role}`);
  }
  return (
    <Dialog>
      <div className="grid grid-cols-1 md:grid-cols-4 my-4">
        <div className="col-span-3">
          <Tabs defaultValue="students">
            <div className="flex justify-between">
              <TabsList className="grid w-72 grid-cols-2">
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="teachers">Teachers</TabsTrigger>
              </TabsList>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus />
                  Add User
                </Button>
              </DialogTrigger>
            </div>
            <TabsContent value="students">
              <StudentList />
            </TabsContent>
            <TabsContent value="teachers">
              <TeacherList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Tabs>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <StudentForm />
          </TabsContent>
          <TabsContent value="teacher">
            <TeacherForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDashboard;
