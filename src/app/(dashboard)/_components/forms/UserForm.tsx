import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { BookMarked, GraduationCap, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { user } from "@/db/schema";
import { createUser } from "@/db/actions/user";
import { toast } from "sonner";

const roleRadioItems = [
  { id: "student", value: "student", label: "Student", Icon: GraduationCap },
  { id: "teacher", value: "teacher", label: "Teacher", Icon: BookMarked },
];

const userSchema = createInsertSchema(user, {
  role: z.enum(["student", "teacher"]),
  email: z.string().email(),
});

const formSchema = z.object({
  user: userSchema,
});

export function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: {
        email: "",
        name: "",
        lastName: "",
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newUser = await createUser(values);
    if (newUser) {
      toast.success("User has been created");
    } else {
      toast.error("Could not create User");
    }
  }
  const { isDirty, isValid, isSubmitting } = form.formState;

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState, form.reset, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="user.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
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
                <Input placeholder="Last name" {...field} />
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
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user.role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="grid-cols-2"
                >
                  {roleRadioItems.map((item) => (
                    <div
                      key={item.id}
                      className="relative flex flex-col gap-4 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
                    >
                      <div className="flex justify-between gap-2">
                        <RadioGroupItem
                          id={item.id}
                          value={item.value}
                          className="order-1 after:absolute after:inset-0"
                        />
                        <item.Icon
                          className="opacity-60"
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </div>
                      <Label htmlFor={item.id}>{item.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          disabled={isSubmitting || !isValid || !isDirty}
          type="submit"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : <>Add</>}
        </Button>
      </form>
    </Form>
  );
}
