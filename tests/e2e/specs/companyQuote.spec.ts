import { companyQuote as test } from "../fixtures/companyQoute.fixture";

test("should get full quote successfully with valid symbol", async ({
    companyQuotePage,
}) => {
    await companyQuotePage.getFullQuote("AAP");
    await companyQuotePage.expectCompanyQuoteSuccess(
        "Advance Auto Parts, Inc."
    );
});

test("should fail to get full quote with incorrect symbol", async ({
    companyQuotePage,
}) => {
    await companyQuotePage.getFullQuote("AAPP");
    await companyQuotePage.expectCompanyQuoteError(
        "Cannot retrieve details for this company."
    );
});

test("should fail to get full quote with invalid symbol", async ({
    companyQuotePage,
}) => {
    await companyQuotePage.getFullQuote('<svg/x=">"/onload=confirm()//');
    await companyQuotePage.expectCompanyQuoteError(
        "The symbol field must only contain letters and numbers."
    );
});

test("should fail to get full quote with empty symbol", async ({
    companyQuotePage,
}) => {
    await companyQuotePage.getFullQuote("");
    await companyQuotePage.expectCompanyQuoteError(
        "The symbol field is required."
    );
});
