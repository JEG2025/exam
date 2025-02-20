import { test as base, expect } from "@playwright/test";
import { NavigationPage } from "../pages";

type NavigationFixture = {
    navigationPage: NavigationPage;
};

export const navigation = base.extend<NavigationFixture>({
    navigationPage: async ({ page }, use) => {
        const navigationPage = new NavigationPage(page);
        await navigationPage.page.goto("/dashboard", { waitUntil: "load" });
        await expect(
            navigationPage.dashboardLink,
            "Dashboard link should be visible"
        ).toBeVisible();
        await use(navigationPage);
        await navigationPage.page.close();
    },
});

export { expect };
