import { test as base } from "@playwright/test";
import { CompanyQuotePage } from "../pages";

type CompanyQuoteFixture = {
    companyQuotePage: CompanyQuotePage;
};

export const companyQuote = base.extend<CompanyQuoteFixture>({
    companyQuotePage: async ({ page }, use) => {
        const companyQuotePage = new CompanyQuotePage(page);
        await companyQuotePage.navigateToCompanyQuote();
        await use(companyQuotePage);
        await companyQuotePage.page.close();
    },
});
