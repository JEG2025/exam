import { faker } from "@faker-js/faker";
import { test as base } from "@playwright/test";
import { RegistrationPage } from "../pages";

type RegistrationFixture = {
    registrationPage: RegistrationPage;
    registrationData: {
        name: string;
        email: string;
        password: string;
    };
};

export const registration = base.extend<RegistrationFixture>({
    registrationPage: async ({ browser }, use) => {
        const cleanContext = await browser.newPage({ storageState: undefined });
        const registrationPage = new RegistrationPage(cleanContext);
        await registrationPage.navigateToRegistration();
        await use(registrationPage);
        await registrationPage.page.close();
    },
    registrationData: async ({}, use) => {
        await use({
            name: faker.person.fullName(),
            email: faker.internet
                .email({ provider: "example.com" })
                .toLocaleLowerCase(),
            password: faker.internet.password({ length: 8, prefix: "$" }),
        });
    },
});
