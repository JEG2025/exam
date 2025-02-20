import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly readmeCheckbox: Locator;
    readonly forgotPasswordLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole("textbox", { name: "email" });
        this.passwordInput = page.getByRole("textbox", { name: "password" });
        this.loginButton = page.getByRole("button", { name: "Log in" });
        this.readmeCheckbox = page.getByRole("checkbox", {
            name: "Remember me",
        });
        this.forgotPasswordLink = page.getByRole("link", {
            name: "Forgot your password?",
        });
    }

    async navigateToLogin(): Promise<void> {
        await this.page.goto("/login");
        await expect(
            this.usernameInput,
            "Username input should be visible"
        ).toBeVisible();
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectLoginError(message: string): Promise<void> {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async expectLoginSuccess(): Promise<void> {
        await this.page.waitForURL("/dashboard");
        await expect(
            this.page.getByRole("heading", { name: "Dashboard" }),
            "Dashboard heading should be visible."
        ).toBeVisible();
    }

    async expectForgotPasswordPage(): Promise<void> {
        await this.page.waitForURL("/forgot-password");
        await expect(this.forgotPasswordLink).toBeHidden();
    }
}
