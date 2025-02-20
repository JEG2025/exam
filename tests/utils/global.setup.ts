import { chromium } from "@playwright/test";

export default async function globalSetup() {
    const browser = await chromium.launch({
        headless: true, // Set to true to run browser in headless mode
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("http://localhost:8000/login");

    // login as admin
    await page.getByRole("textbox", { name: "email" }).fill("main@test.com");
    await page
        .getByRole("textbox", { name: "Password" })
        .fill(process.env.PASSWORD || "password");
    await page.getByRole("button", { name: "Log in" }).click();
    await page.waitForURL("http://localhost:8000/dashboard", {
        timeout: 15_000,
    });
    // store storage state for future use
    await context.storageState({ path: "tests/utils/storagestate.json" });

    await browser.close();
}
