import { faker } from "@faker-js/faker";
import { insertUserType } from "../../../types/userTypes";
export const generateUser = (): insertUserType => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const sex = faker.person.sexType();

  return {
    user: {
      name: firstName,
      lastName: lastName,
      email: email,
      role: "staff",
      sex: sex,
    },
  };
};

export const generateUsers = (amount: number) => {
  return Array.from({ length: amount }, generateUser);
};
