import { registration as test } from "../fixtures/registration.fixture";

test("should register successfully", async ({
    registrationPage,
    registrationData,
}) => {
    const { name, email, password } = registrationData;
    await registrationPage.register(name, email, password);
    await registrationPage.expectRegistrationSuccess();
});

test("should fail to register with bad password - too short", async ({
    registrationPage,
    registrationData,
}) => {
    const { name, email } = registrationData;
    await registrationPage.register(name, email, "123abc!");
    await registrationPage.expectRegistrationError(
        "The password field must be at least 8 characters."
    );
});

test("should fail to register with bad password - no uppercase and no lowercase", async ({
    registrationPage,
    registrationData,
}) => {
    const { name, email } = registrationData;
    await registrationPage.register(name, email, "123456789");
    await registrationPage.expectRegistrationError(
        "The password field must contain at least one uppercase and one lowercase letter."
    );
});

test("should fail to register with already registered email", async ({
    registrationPage,
    registrationData,
}) => {
    const { name, password } = registrationData;
    await registrationPage.register(name, "main@test.com", password);
    await registrationPage.expectRegistrationError(
        "The email has already been taken."
    );
});

test("should fail to register with bad email", async ({
    registrationPage,
    registrationData,
}) => {
    const { name, password } = registrationData;
    await registrationPage.register(
        name,
        "Hubert.Douglas81@example.com",
        password
    );
    await registrationPage.expectRegistrationError(
        "The email field must be lowercase."
    );
});

test("should redirect to login page if already registered link is clicked", async ({
    registrationPage,
}) => {
    await registrationPage.alreadyRegisteredLink.click();
    await registrationPage.expectAlreadyRegisteredPage();
});
