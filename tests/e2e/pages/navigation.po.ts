import { Page, Locator, expect } from "@playwright/test";

export class NavigationPage {
    readonly page: Page;
    readonly dashboardLink: Locator;
    readonly companyInformationLink: Locator;
    readonly companyQuotesLink: Locator;
    readonly logoutButton: Locator;
    readonly profileLink: Locator;
    readonly profileButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardLink = page.getByRole("link", { name: "Dashboard" });
        this.companyInformationLink = page.getByRole("link", {
            name: "Company Information",
        });
        this.companyQuotesLink = page.getByRole("link", {
            name: "Company Quote",
        });
        this.logoutButton = page.getByRole("button", { name: "Log out" });
        this.profileLink = page.getByRole("link", { name: "Profile" });
        this.profileButton = page.getByRole("button", {
            name: "Main Test User",
        }); // Full name of the admin user
    }

    async logout(): Promise<void> {
        await this.profileButton.click();
        await this.logoutButton.click();
        await this.page.waitForURL("/");
    }

    async navigateToDashboard(): Promise<void> {
        await this.dashboardLink.click();
        await this.page.waitForURL("/dashboard");
        await expect(
            this.dashboardLink,
            "Dashboard link should be visible"
        ).toBeVisible();
    }

    async navigateToCompanyInformation(): Promise<void> {
        await this.companyInformationLink.click();
        await this.page.waitForURL("/company-information");
        await expect(
            this.page.getByRole("heading", { name: "Company Information" }),
            "Company Information heading should be visible."
        ).toBeVisible();
    }

    async navigateToCompanyQuotes(): Promise<void> {
        await this.companyQuotesLink.click();
        await this.page.waitForURL("/company-quote");
        await expect(
            this.page.getByRole("heading", { name: "Company Quote" }),
            "Company Quotes heading should be visible."
        ).toBeVisible();
    }

    async navigateToProfile(): Promise<void> {
        await this.profileButton.click();
        await this.profileLink.click();
        await this.page.waitForURL("/profile");
        await expect(
            this.page.getByRole("heading", { name: "Profile Information" }),
            "Profile heading should be visible."
        ).toBeVisible();
    }
}
