const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:80/accounts/signup/', { waitUntil: 'networkidle2' });

    await browser.close();
})();