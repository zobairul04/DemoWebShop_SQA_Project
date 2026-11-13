# DemoWebShop SQA Automation Project

## 1. Project Overview

This project demonstrates automated software quality assurance testing using **Playwright, JavaScript, Page Object Model (POM), Postman, and Newman**.

The project covers three UI automation scenarios for the Demo Web Shop application and API testing using JSONPlaceholder.

The automation framework supports individual test execution, sequential execution, HTML reporting, Allure reporting, screenshots, and command-line execution.

### Applications Under Test

- **UI Application:** https://demowebshop.tricentis.com/
- **API Application:** https://jsonplaceholder.typicode.com/users

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| JavaScript | Automation programming language |
| Node.js and npm | Runtime and dependency management |
| Playwright | UI automation framework |
| Page Object Model (POM) | Reusable page actions and locators |
| Chromium | Browser used for UI testing |
| Postman | API collection development and validation |
| Newman | Command-line API test execution |
| HTML Reporter | Test execution reports |
| Allure Reporter | Detailed execution reports and attachments |
| Git and GitHub | Version control and project submission |

## 3. UI Automation Test Scenarios

### Q1: Invalid Login

**Objective:** Verify that invalid login credentials do not allow users to log in.

**Test coverage:**

1. Open the Demo Web Shop login page.
2. Enter an invalid email address and password.
3. Submit the login form.
4. Verify the login error message.
5. Verify that the user remains logged out.
6. Capture test evidence.

### Q2: Registration, Login, and Add to Cart

**Objective:** Validate customer registration, login, product selection, and shopping cart functionality.

**Test coverage:**

1. Register a customer using a unique email address.
2. Verify successful registration.
3. Log out.
4. Log in using the registered credentials.
5. Navigate to the Books category.
6. Select the Computing and Internet product.
7. Add the product to the shopping cart.
8. Verify the correct product and quantity.
9. Capture shopping cart evidence.

### Q3: Complete End-to-End Order

**Objective:** Verify the complete shopping and order placement workflow.

**Test coverage:**

1. Register and log in using a new customer account.
2. Search for the Computing and Internet product.
3. Verify the search result and product details.
4. Increase product quantity from 1 to 2.
5. Add the product to the shopping cart.
6. Verify product name and quantity.
7. Accept the terms of service.
8. Proceed to checkout.
9. Complete billing and shipping information.
10. Select Ground shipping.
11. Select Cash on Delivery.
12. Confirm the order.
13. Verify successful order confirmation.
14. Open the order details page.
15. Verify the order number, product, and quantity.
16. Capture order confirmation and order details screenshots.

All three UI scenarios are designed to run independently and sequentially.

## 4. API Automation

**Base URL:** https://jsonplaceholder.typicode.com

**Endpoint:** `/users`

### API Test 1: GET All Users

**Method:** GET

**Request URL:** `{{baseUrl}}/users`

**Validations:**

- HTTP status code is 200.
- Response is a non-empty array.
- Every user has an ID, name, and email.
- Required values have valid types.
- A user ID is saved in a local variable for subsequent testing.

### API Test 2: Update User

**Method:** PUT

**Request URL:** `{{baseUrl}}/users/{{userId}}`

The request uses dynamically generated values to update:

- `name`
- `email`
- `company.name`

**Validations:**

- HTTP status code is 200.
- Returned user ID matches the selected ID.
- Phone number is not empty.
- Updated name matches the generated name.
- Updated email matches the generated email.
- Updated company name matches the generated company name.
- Other original user fields remain unchanged in the response.

The PUT request also supports independent execution by retrieving the required user information during its setup.

**Important:** JSONPlaceholder is a mock REST API. Its PUT endpoint simulates updates and returns a response without permanently modifying server data.

## 5. Project Structure

```text
DemoWebShop_SQA_Project/
├── pages/
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   ├── SearchPage.js
│   ├── CheckoutPage.js
│   └── OrderPage.js
│
├── tests/
│   ├── 01-invalid-login.spec.js
│   ├── 02-register-cart.spec.js
│   └── 03-checkout.spec.js
│
├── testData/
│
├── api-tests/
│   └── users.postman_collection.json
│
├── scripts/
│   ├── run-ui.js
│   ├── run-api.js
│   └── run-all.js
│
├── evidence/
│   ├── ui/
│   │   ├── combined/
│   │   ├── q1/
│   │   ├── q2/
│   │   └── q3/
│   └── api/
│       ├── all/
│       ├── get/
│       └── put/
│
├── playwright.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

Generated report directories may be excluded from Git using `.gitignore`. Selected report evidence is stored separately in the `evidence` folder.

## 6. Prerequisites

Install the following software:

- Node.js and npm
- Git
- Visual Studio Code or another code editor
- Postman
- Java, required for generating Allure reports

The project has been developed for execution on Windows using PowerShell.

Verify the installed tools:

```powershell
node -v
npm -v
git --version
java -version
```

## 7. Installation and Setup

### Step 1: Clone the Repository

```powershell
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

```powershell
cd DemoWebShop_SQA_Project
```

Replace the repository URL placeholder with the actual public GitHub repository URL.

### Step 2: Install Dependencies

```powershell
npm ci
```

### Step 3: Install Playwright Browser

```powershell
npx playwright install chromium
```

The project is now ready for test execution.

## 8. UI Test Execution

### Run Q1 Independently

```powershell
npm run test:q1
```

### Run Q2 Independently

```powershell
npm run test:q2
```

### Run Q3 Independently

```powershell
npm run test:q3
```

### Run All UI Tests

```powershell
npm run test:ui
```

The UI suite uses a single worker, with test files ordered Q1, Q2, and Q3.

Each scenario uses its own browser context and test data to avoid unnecessary dependencies between scenarios.

## 9. Postman API Execution

### Import the Collection

1. Open Postman.
2. Select Import.
3. Choose `api-tests/users.postman_collection.json`.
4. Import the collection.
5. Verify the `baseUrl` collection variable.
6. Open the collection runner.
7. Select the GET and PUT requests.
8. Keep the execution order as GET followed by PUT.
9. Set iterations to 1.
10. Run the collection and review the test results.

### Run API Tests Using Newman

Run GET and PUT together:

```powershell
npm run test:api
```

Run GET independently:

```powershell
npm run test:api:get
```

Run PUT independently:

```powershell
npm run test:api:put
```

The API runner supports HTML and Allure report generation.

## 10. Run the Complete Automation Suite

To execute all three UI scenarios and the API collection:

```powershell
npm run test:all
```

The combined runner executes the UI and API suites and provides a final success or failure status.

A failure in one suite does not prevent the other suite from executing.

## 11. Test Reports

### UI HTML Report

After running UI tests:

```powershell
npm run report:html
```

### UI Allure Report

Generate the report if required:

```powershell
npm run report:generate
```

Open the report:

```powershell
npm run report:open
```

### API HTML Report

After a combined API execution:

```powershell
Start-Process .\reports\api\all\api-report.html
```

### API Allure Report

```powershell
npm run report:api:open
```

Individual API execution reports are also generated under:

- `reports/api/get/`
- `reports/api/put/`

## 12. Screenshots and Report Evidence

Playwright is configured to capture screenshots during UI test execution.

Additional screenshots are attached to important test scenarios, including:

- Invalid login verification
- Shopping cart verification
- Successful order confirmation
- Order details verification

Selected reports from individual and combined runs are stored in:

```text
evidence/ui/
evidence/api/
```

The evidence folders contain saved HTML and Allure reports.

HTML Extra reports are generated for Newman API execution.

For the current UI and API runs, refer to the corresponding saved reports and their test results rather than relying only on previous execution summaries.

## 13. Playwright Configuration

The Playwright framework includes:

- Chromium browser execution
- Page Object Model structure
- Single-worker execution
- Test timeouts and assertion timeouts
- Screenshots
- Failure traces
- HTML reports
- Allure integration

Configuration details are available in `playwright.config.js`.

## 14. Git and GitHub Workflow

The project follows a feature-branch workflow.

Feature branches used during development include:

- `feature/q1-invalid-login`
- `feature/q2-register-cart`
- `feature/q3-checkout`
- `feature/api-users`
- `feature/final-integration`
- `feature/readme-documentation`

Features are developed and committed separately before being merged into the main branch.

Meaningful commits document changes such as page object creation, test implementation, locator fixes, API validations, reporting setup, and documentation.

The final project is intended to be maintained in a public GitHub repository.

## 15. Test Data and Limitations

- New customer accounts use unique generated email addresses.
- Invalid login data is used for negative authentication testing.
- Checkout uses demonstration address information.
- The order workflow uses Cash on Delivery rather than payment card information.
- API update values are dynamically generated.
- JSONPlaceholder PUT updates are simulated rather than permanently stored.
- UI execution requires browser access and a functioning internet connection.
- Allure report generation requires Java.

## 16. Conclusion

This project demonstrates automated testing of authentication, customer registration, shopping cart functionality, product search, checkout, order confirmation, order details, and REST API validation.

The framework combines maintainable Playwright POM architecture with Postman and Newman automation, test reports, screenshots, and Git-based version control.