import { Page, Locator, expect } from "@playwright/test";

export class ProfilePage {
    readonly page: Page;
    readonly profileHeading: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly saveButton: Locator;
    readonly currentPasswordInput: Locator;
    readonly newPasswordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly deleteAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileHeading = page.getByRole("heading", {
            name: "Profile Information",
        });
        this.nameInput = page.getByRole("textbox", { name: "Name" });
        this.emailInput = page.getByRole("textbox", { name: "Email" });
        this.saveButton = page.getByRole("button", { name: "Save" });
        this.currentPasswordInput = page.getByRole("textbox", {
            name: "Current password",
        });
        this.newPasswordInput = page.getByRole("textbox", {
            name: "New password",
        });
        this.confirmPasswordInput = page.getByRole("textbox", {
            name: "Confirm password",
        });
        this.deleteAccountButton = page.getByRole("button", {
            name: "Delete Account",
        });
    }

    async navigateToProfile() {
        await this.page.goto("/profile", { waitUntil: "load" });
        await expect(this.profileHeading).toBeVisible();
    }

    async updateProfileInformation(name: string, email: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.saveButton.first().click();
        await expect(
            this.page.getByText("Saved.", { exact: true })
        ).toBeVisible();
    }

    async expectProfileInformationSuccess(name: string, email: string) {
        await expect(this.profileHeading).toBeVisible();
        await expect(this.nameInput).toHaveValue(name);
        await expect(this.emailInput).toHaveValue(email);
    }

    async updatePassword(currentPassword: string, newPassword: string) {
        await this.currentPasswordInput.fill(currentPassword);
        await this.newPasswordInput.fill(newPassword);
        await this.confirmPasswordInput.fill(newPassword);
        await this.saveButton.last().click();
        await expect(
            this.page.getByText("Saved.", { exact: true })
        ).toBeVisible();
    }

    async deleteAccount(password: string) {
        await this.deleteAccountButton.click();
        await this.confirmPasswordInput.fill(password);
        await this.deleteAccountButton.click();
        await expect(
            this.page.getByText("Deleted.", { exact: true })
        ).toBeVisible();
    }

    async expectProfileUpdateError(errorMessage: string) {
        await expect(
            this.page.getByText(errorMessage, { exact: true })
        ).toBeVisible();
    }
}
