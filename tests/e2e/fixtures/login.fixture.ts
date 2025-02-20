import { test as base } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../pages";

type LoginFixture = {
    loginPage: LoginPage;
    credentials: {
        email: string;
        password: string;
    };
};

export const login = base.extend<LoginFixture>({
    loginPage: async ({ browser }, use) => {
        const cleanContext = await browser.newPage({ storageState: undefined });
        const loginPage = new LoginPage(cleanContext);
        await loginPage.navigateToLogin();
        await use(loginPage);
        await loginPage.page.close();
    },

    credentials: async ({}, use) => {
        await use({
            email: faker.internet.email({ provider: "example.com" }),
            password: faker.internet.password({ length: 8, prefix: "$" }),
        });
    },
});
