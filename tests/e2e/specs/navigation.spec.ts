import { navigation as test, expect } from "../fixtures/navigation.fixture";

test("should navigate to dashboard", async ({ navigationPage }) => {
    await navigationPage.navigateToDashboard();
});

test("should navigate to company information", async ({ navigationPage }) => {
    await navigationPage.navigateToCompanyInformation();
});

test("should navigate to company quotes", async ({ navigationPage }) => {
    await navigationPage.navigateToCompanyQuotes();
});

test("should navigate to profile", async ({ navigationPage }) => {
    await navigationPage.navigateToProfile();
});

test("should logout successfully", async ({ navigationPage }) => {
    await navigationPage.logout();
    await expect(
        navigationPage.page.getByRole("link", { name: "log in" })
    ).toBeVisible();
});
