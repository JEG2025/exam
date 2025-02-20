import { profile as test } from "../fixtures/profile.fixture";

test("should update profile information successfully", async ({
    profilePage,
    loginPage,
    setupUpdateEmailTest,
}) => {
    const { name, email } = setupUpdateEmailTest;

    await test.step("Login", async () => {
        await loginPage.navigateToLogin();
        await loginPage.login(email, "password");
        await loginPage.expectLoginSuccess();
    });

    await test.step("Update Profile Information", async () => {
        await profilePage.navigateToProfile();
        await profilePage.updateProfileInformation(name, email);
    });

    await test.step("Verify Profile Information", async () => {
        await profilePage.page.reload({ waitUntil: "load" });
        await profilePage.expectProfileInformationSuccess(name, email);
    });
});

test("should update password successfully", async ({
    profilePage,
    loginPage,
    setupUpdatePasswordTest,
}) => {
    const { newPassword, email } = setupUpdatePasswordTest;

    await test.step("Login", async () => {
        await loginPage.navigateToLogin();
        await loginPage.login(email, "password");
        await loginPage.expectLoginSuccess();
    });

    await test.step("Update Password", async () => {
        await profilePage.navigateToProfile();
        await profilePage.updatePassword("password", newPassword);
    });
});

test("should not be able to update existing email", async ({
    profilePage,
    setupForgotPasswordTest,
}) => {
    const { email } = setupForgotPasswordTest;
    await test.step("Update Profile Information", async () => {
        await profilePage.navigateToProfile();
        await profilePage.emailInput.fill(email);
        await profilePage.saveButton.first().click();
    });

    await test.step("assert error message", async () => {
        await profilePage.expectProfileUpdateError(
            "The email has already been taken."
        );
    });
});

test("should fail to update password with new password that is too short", async ({
    profilePage,
}) => {
    await test.step("Update Password", async () => {
        await profilePage.navigateToProfile();
        await profilePage.currentPasswordInput.fill("password");
        await profilePage.newPasswordInput.fill("short");
        await profilePage.confirmPasswordInput.fill("short");
        await profilePage.saveButton.last().click();
    });

    await test.step("assert error message", async () => {
        await profilePage.expectProfileUpdateError(
            "The password field must be at least 8 characters."
        );
    });
});

test("should fail to update password with new password that does not match", async ({
    profilePage,
}) => {
    await test.step("Update Password", async () => {
        await profilePage.navigateToProfile();
        await profilePage.currentPasswordInput.fill("password");
        await profilePage.newPasswordInput.fill("newpassword");
        await profilePage.confirmPasswordInput.fill("newpassword2");
        await profilePage.saveButton.last().click();
    });

    await test.step("assert error message", async () => {
        await profilePage.expectProfileUpdateError(
            "The password field confirmation does not match."
        );
    });
});

test("should fail to update password with current password that is incorrect", async ({
    profilePage,
}) => {
    await test.step("Update Password", async () => {
        await profilePage.navigateToProfile();
        await profilePage.currentPasswordInput.fill("incorrect");
        await profilePage.newPasswordInput.fill("newpassword");
        await profilePage.confirmPasswordInput.fill("newpassword");
        await profilePage.saveButton.last().click();
    });

    await test.step("assert error message", async () => {
        await profilePage.expectProfileUpdateError(
            "The password is incorrect."
        );
    });
});
