import { Page, Locator, expect } from "@playwright/test";

export class RegistrationPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly alreadyRegisteredLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByRole("textbox", { name: "name" });
        this.emailInput = page.getByRole("textbox", { name: "email" });
        this.passwordInput = page.getByRole("textbox", {
            name: "Password",
            exact: true,
        });
        this.confirmPasswordInput = page.getByRole("textbox", {
            name: "Confirm password",
        });
        this.registerButton = page.getByRole("button", { name: "Register" });
        this.alreadyRegisteredLink = page.getByRole("link", {
            name: "Already registered?",
        });
    }

    async navigateToRegistration(): Promise<void> {
        await this.page.goto("/register", { waitUntil: "commit" });
        await expect(
            this.nameInput,
            "Name input should be visible"
        ).toBeVisible();
    }

    async register(
        name: string,
        email: string,
        password: string
    ): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.registerButton.click();
    }

    /**
     * @param message  The error message to expect
     */
    async expectRegistrationError(message: string): Promise<void> {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async expectAlreadyRegisteredPage(): Promise<void> {
        await this.page.waitForURL("/login");
        await expect(this.alreadyRegisteredLink).toBeHidden();
    }

    async expectRegistrationSuccess(): Promise<void> {
        await this.page.waitForURL("/dashboard");
        await expect(
            this.page.getByRole("heading", { name: "Dashboard" }),
            "Dashboard heading should be visible."
        ).toBeVisible();
    }
}
