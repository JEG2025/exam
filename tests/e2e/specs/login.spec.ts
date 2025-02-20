import { login as test } from "../fixtures/login.fixture";

test("should login successfully", async ({ loginPage }) => {
    await loginPage.login("main@test.com", "password");
    await loginPage.expectLoginSuccess();
});

test("should fail to login with incorrect password", async ({
    loginPage,
    credentials,
}) => {
    await loginPage.login("main@test.com", credentials.password);
    await loginPage.expectLoginError(
        "These credentials do not match our records."
    );
});

test("should fail to login with incorrect email", async ({
    loginPage,
    credentials,
}) => {
    await loginPage.login(credentials.email, "password");
    await loginPage.expectLoginError(
        "These credentials do not match our records."
    );
});

test("should redirect to forgot password page if forgot password link is clicked", async ({
    loginPage,
}) => {
    await loginPage.forgotPasswordLink.click();
    await loginPage.expectForgotPasswordPage();
});
