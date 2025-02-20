## Setup Instructions

### Prerequisites
- MySQL
- PHP
- Composer
- Node.js with npm

### Installation Steps:
1. Clone this repository
2. Open a terminal and navigate to the project directory
3. Run `composer install`
4. Run `php artisan migrate`
5. Copy the contents of `.env.example` to a new `.env` file
6. Run `npm install`
7. Start the server-side development server with `php artisan serve`
8. Start the client-side development server with `npm run dev`
9. Visit `http://localhost:8000` to use the web app

### Seeding the Database
1. Run the database seeder to create test users:
   ```bash
   php artisan db:seed
   ```

### Running the Tests

#### Install Test Dependencies
1. Install Playwright with:
   ```bash
   npm install --save-dev playwright
   ```
2. Install TypeScript with:
   ```bash
   npm install -D typescript@latest
   ```
3. Install Playwright browsers with:
   ```bash
   npx playwright install-deps
   ```

#### Execute the Tests
1. Run all tests with:
   ```bash
   npm test
   ```
   or
   ```bash
   npx playwright test
   ```
2. Run tests for a specific file with:
   ```bash
   npx playwright test filename.spec.ts
   ```

## What's Being Tested?
The end-to-end tests cover:
- **Company Information**: Valid and invalid symbol inputs
- **Company Quotes**: Valid and invalid symbol inputs
- **Login**: Successful login, incorrect password, and incorrect email
- **Navigation**: Dashboard, company information, company quotes, profile, and logout functionality
- **Profile**: Updating profile information, password updates, and email validation
- **Registration**: Successful registration, password validation, email validation, and handling duplicate emails

These tests ensure the application handles various scenarios, including error conditions and validation.

## Test Configuration Details

### Playwright Configuration
The Playwright configuration file (`playwright.config.ts`) is set up to:
- Run tests in Chromium by default
- Use a base URL of `http://localhost:8000`
- Store authentication state in `storagestate.json`
- Run tests in headless mode during CI
- Retry failed tests up to 2 times in CI environment

### Global Setup
The global setup script (`tests/utils/global.setup.ts`) handles:
- Launching a Chromium browser in headless mode
- Navigating to the login page
- Logging in with the main test user
- Storing the authentication state for all tests
