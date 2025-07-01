const puppeteer = require('puppeteer');

(async () => {
    console.log('Starting test...');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        console.log('Navigating to http://localhost:80/accounts/signup/...');
        await page.goto('http://localhost:80/accounts/signup/', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        console.log('Page loaded successfully!');

        // Check if the page has the expected content
        const title = await page.title();
        console.log('Page title:', title);

        // Check if signup form elements are present
        const signupForm = await page.$('form');
        if (signupForm) {
            console.log('✓ Signup form found');
        } else {
            throw new Error('Signup form not found');
        }

        // Fill out the signup form
        console.log('Filling out signup form...');

        const testData = {
            email: `bob@acme.com`,
            password: 'TestPassword123!',
            firstName: 'Bob',
            lastName: 'McFlows',
            organization: 'ACME'
        };

        // Fill out the signup form fields
        const firstNameField = await page.$('#id_first_name');
        if (firstNameField) {
            await firstNameField.type(testData.firstName);
            console.log('✓ First name field filled');
        } else {
            throw new Error('First name field not found');
        }

        const lastNameField = await page.$('#id_last_name');
        if (lastNameField) {
            await lastNameField.type(testData.lastName);
            console.log('✓ Last name field filled');
        } else {
            throw new Error('Last name field not found');
        }

        const emailField = await page.$('#id_email');
        if (emailField) {
            await emailField.type(testData.email);
            console.log('✓ Email field filled');
        } else {
            throw new Error('Email field not found');
        }

        const passwordField = await page.$('#id_password1');
        if (passwordField) {
            await passwordField.type(testData.password);
            console.log('✓ Password field filled');
        } else {
            throw new Error('Password field not found');
        }

        const workspaceField = await page.$('#id_workspace');
        if (workspaceField) {
            await workspaceField.click({ clickCount: 3 });
            await workspaceField.type(testData.organization);
            console.log('✓ Workspace field filled');
        } else {
            throw new Error('Workspace field not found');
        }

        console.log('Submitting signup form...');

        const submitButton = await page.$('button[type="submit"]');
        if (submitButton) {
            await submitButton.click();
            console.log('✓ Sign Up button clicked');
        } else {
            throw new Error('Sign Up button not found');
        }

        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });

        console.log('✓ Signup form test completed successfully!');

    } catch (error) {
        console.error('✗ Test failed:', error.message);

        // Try to capture a screenshot for debugging
        try {
            await page.screenshot({ path: 'test-failure.png', fullPage: true });
            console.log('Screenshot saved as test-failure.png');
        } catch (screenshotError) {
            console.log('Could not save screenshot');
        }

        process.exit(1);
    } finally {
        await browser.close();
    }
})();