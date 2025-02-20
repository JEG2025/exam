import { Page, Locator, expect } from "@playwright/test";

export class CompanyQuotePage {
    readonly page: Page;
    readonly symbollInput: Locator;
    readonly getFullQuoteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.symbollInput = page.getByRole("textbox", { name: "Symbol" });
        this.getFullQuoteButton = page.getByRole("button", {
            name: "Get Full Quote",
        });
    }

    async navigateToCompanyQuote(): Promise<void> {
        await this.page.goto("/company-quote", { waitUntil: "commit" });
        await expect(
            this.symbollInput,
            "Symbol input should be visible"
        ).toBeVisible();
    }

    async getFullQuote(symbol: string = "AAP"): Promise<void> {
        await this.symbollInput.fill(symbol);
        await this.getFullQuoteButton.click();
        await this.page.waitForURL("/company-quote/full?symbol=**");
    }

    async expectCompanyQuoteSuccess(
        companyName: string = "Advance Auto Parts, Inc."
    ): Promise<void> {
        await this.expectCompanyHeading(companyName);

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

    async expectCompanyQuoteError(message: string): Promise<void> {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    private async expectCompanyHeading(companyName: string): Promise<void> {
        await expect(
            this.page
                .locator("main")
                .getByRole("heading", { name: companyName }),
            `${companyName} heading should be visible.`
        ).toBeVisible();
    }
}
