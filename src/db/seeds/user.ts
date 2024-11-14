import { faker } from "@faker-js/faker";
import { insertUserType } from "../../../types/userTypes";
export const generateUser = (): insertUserType => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });

  return {
    user: {
      name: firstName,
      lastName: lastName,
      email: email,
      role: "",
    },
  };
};

export const generateUsers = (amount: number) => {
  return Array.from({ length: amount }, generateUser);
};
