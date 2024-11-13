import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/db/actions/user";
import { user } from "@/db/schema";
import { getUserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSelectSchema } from "drizzle-zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const userSchema = createSelectSchema(user, {
  email: z.string().email(),
});

const formSchema = z.object({
  user: userSchema,
});

const EditUserForm = ({ data }: { data: getUserType }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: data,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await updateUser(data.id, values);
    if (res.status) {
      toast.success(`User has been updated`);
    } else {
      toast.error("Could not update student");
    }
  }

  const { isDirty, isValid, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="user.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="name"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="last name"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting || !isValid || !isDirty} type="submit">
          {isSubmitting ? <Loader2 className="animate-spin" /> : <>Update</>}
        </Button>
      </form>
    </Form>
  );
};

export default EditUserForm;
