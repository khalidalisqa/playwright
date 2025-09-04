import { test as base } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

type UserData = {
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  password: string;
};

// Extend base test with our custom fixture
export const test = base.extend<{
  userData: UserData;
}>({
  userData: async ({}, use) => {
    const filePath = path.resolve(__dirname, "../fixtures/userData.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    await use(data as UserData);
  },
});

export { expect } from "@playwright/test";
