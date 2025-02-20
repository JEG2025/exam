import { test as base } from "@playwright/test";
import { ProfilePage, LoginPage } from "../pages";
import { faker } from "@faker-js/faker";

type ProfileFixture = {
    profilePage: ProfilePage;
    loginPage: LoginPage;

    setupForgotPasswordTest: {
        name: string;
        email: string;
    };
    setupUpdatePasswordTest: {
        newPassword: string;
        email: string;
    };
    setupUpdateEmailTest: {
        name: string;
        email: string;
    };
};

export const profile = base.extend<ProfileFixture>({
    profilePage: async ({ page }, use) => {
        const profilePage = new ProfilePage(page);
        await use(profilePage);
        await profilePage.page.close();
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.page.context().clearCookies();
        await loginPage.navigateToLogin();
        await use(loginPage);
    },

    setupForgotPasswordTest: async ({}, use) => {
        const profileData = {
            name: "Forgot Password Test",
            email: "forgot@test.com",
        };
        await use(profileData);
    },

    setupUpdatePasswordTest: async ({}, use) => {
        const profileData = {
            newPassword: faker.internet.password({ length: 8, prefix: "$" }),
            email: "updatepass@test.com",
        };
        await use(profileData);
    },

    setupUpdateEmailTest: async ({}, use) => {
        const profileData = {
            name: faker.person.fullName(),
            email: "updateemail@test.com",
        };
        await use(profileData);
    },
});
