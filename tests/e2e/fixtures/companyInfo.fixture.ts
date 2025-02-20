import { test as base } from "@playwright/test";
import { CompanyInformationPage } from "../pages";

type CompanyInformationFixture = {
    companyInformationPage: CompanyInformationPage;
};

export const companyInformation = base.extend<CompanyInformationFixture>({
    companyInformationPage: async ({ page }, use) => {
        const companyInformationPage = new CompanyInformationPage(page);
        await companyInformationPage.navigateToCompanyInformation();
        await use(companyInformationPage);
        //await companyInformationPage.page.close();
    },
});
