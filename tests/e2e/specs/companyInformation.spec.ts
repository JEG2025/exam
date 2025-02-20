import { companyInformation as test } from "../fixtures/companyInfo.fixture";

test("should get profile successfully with valid symbol", async ({
    companyInformationPage,
}) => {
    await companyInformationPage.getProfile("AAP");
    await companyInformationPage.expectCompanyInformationSuccess(
        "Advance Auto Parts, Inc."
    );
});

test("should fail to get profile with incorrect symbol", async ({
    companyInformationPage,
}) => {
    await companyInformationPage.getProfile("AAPP");
    await companyInformationPage.expectCompanyInformationError(
        "Cannot retrieve details for this company."
    );
});

test("should fail to get profile with invalid symbol", async ({
    companyInformationPage,
}) => {
    await companyInformationPage.getProfile(
        '<svg </onload ="1> (_=prompt,_(1)) "">'
    );
    await companyInformationPage.expectCompanyInformationError(
        "The symbol field must only contain letters and numbers."
    );
});

test("should fail to get profile with empty symbol", async ({
    companyInformationPage,
}) => {
    await companyInformationPage.getProfile("");
    await companyInformationPage.expectCompanyInformationError(
        "The symbol field is required."
    );
});
