import { Page, Locator, expect } from "@playwright/test";

export class CompanyInformationPage {
    readonly page: Page;
    readonly symbollInput: Locator;
    readonly getProfileButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.symbollInput = page.getByRole("textbox", { name: "Symbol" });
        this.getProfileButton = page.getByRole("button", {
            name: "Get Profile",
        });
    }

    async navigateToCompanyInformation(): Promise<void> {
        await this.page.goto("/company-information", { waitUntil: "commit" });
        await expect(
            this.symbollInput,
            "Symbol input should be visible"
        ).toBeVisible();
    }

    async getProfile(symbol: string = "AAP"): Promise<void> {
        await this.symbollInput.fill(symbol);
        await this.getProfileButton.click();
        await this.page.waitForURL("/company-information/profile?symbol=**");
    }

    async expectCompanyInformationSuccess(
        companyName: string = "Advance Auto Parts, Inc."
    ): Promise<void> {
        await this.expectCompanyHeading(companyName);
        await this.expectCompanyDescription(companyName);
        await this.expectCompanyLogo(companyName);

        const allGrids = await this.page.locator(".mb-4").all();
        for (const gridElement of allGrids) {
            const paragraphs = await gridElement.locator("p").all();

            expect(paragraphs.length).toBe(2);

            // Asser that grid has two paragraphs with text content || Data should be present
            for (const paragraph of paragraphs) {
                const text = await paragraph.textContent();
                expect(text).not.toBeNull(); // Ensure text is not null
                expect(text.trim()).not.toBe(""); // Ensure text is not empty or just whitespace
            }
        }
    }

    async expectCompanyInformationError(message: string): Promise<void> {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    private async expectCompanyHeading(companyName: string): Promise<void> {
        await expect(
            this.page
                .locator("main")
                .getByRole("heading", {
                    name: `${companyName} - Company Profile`,
                }),
            `${companyName} heading should be visible.`
        ).toBeVisible();
    }

    private async expectCompanyDescription(companyName: string): Promise<void> {
        await expect(
            this.page.locator(".border-b").getByRole("paragraph")
        ).toContainText(companyName);
    }

    private async expectCompanyLogo(companyName: string): Promise<void> {
        await expect(
            this.page.locator("main").getByRole("img")
        ).toHaveAttribute("alt", `${companyName} Logo`);
    }
}
