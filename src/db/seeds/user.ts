import { insertStudentType } from "@/types";
import { faker } from "@faker-js/faker";
export const generateUser = (): Omit<insertStudentType, "userId"> => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });

  return {
    name: firstName,
    lastName: lastName,
    email: email,
  };
};

export const generateUsers = (amount: number) => {
  return Array.from({ length: amount }, generateUser);
};
