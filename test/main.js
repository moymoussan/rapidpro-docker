import { launch } from 'puppeteer';

(async () => {
    console.log('Starting test...');

    const browser = await launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        console.log('Navigating to http://localhost/accounts/signup/...');
        await page.goto('http://localhost/accounts/signup/', {
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

        console.log('✓ Test passed successfully!');

    } catch (error) {
        console.error('✗ Test failed:', error.message);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();