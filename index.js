const puppeteer = require('puppeteer');

/* --no-sanbox arg is necesary to puppeteet to work with GCF */
let browserPromise = puppeteer.launch({
    args: ['--no-sandbox',]
});


exports.getTicketSaleBlackPink = async (req, res) => {

    const url = req.query.url || 'https://blackpinkofficial.com/worldtourbornpink/';

    const browser = await browserPromise;
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.goto(url);
    // Wait for the required DOM to be rendered
    await page.waitForSelector('.schedule--row');

    cities = await page.$$eval('.schedule--row > .schedule--city', elems => {
        return elems.map(el => el.textContent);
    });

    let urls = await page.$$eval('.schedule--row > .schedule--actions > a', links => {
        // Extract the links from the data
        return links.filter(el => el.textContent == 'TICKET LINK').map(el => el.href);
    });

    result = [];
    cities.forEach((value, index) => {
        result.push({ 'city': value, 'ticket': urls[index] });
    });

    res.setHeader('Content-type', 'application/json');
    res.send(result);

    context.close();

}