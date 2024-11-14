const puppeteer = require("puppeteer");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const scrapActions = {
  getScrap: async () => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
    });
    const page = await browser.newPage();

    try {
      await page.goto('https://www.zonaprop.com.ar/departamentos-alquiler-q-quilmes.html', { waitUntil: 'domcontentloaded', timeout: 60000 });
      await delay(5000);
      await page.waitForSelector('div.PostingCardContainer-sc-i1odl-1');

      const rentalsProperties = await page.$$eval('div.PostingCardContainer-sc-i1odl-1', elements => 
        elements.map(el => {
          const priceElement = el.querySelector('div[data-qa="POSTING_CARD_PRICE"]');
          const nameInmb = el.querySelector('div.postingAddress')
          const priceCurrent = priceElement ? priceElement.innerText : 'Precio no disponible';
          const nameImbCurrent = nameInmb ? nameInmb.innerHTML : "Nombre no disponible";
          return {
            price : priceCurrent,
            nameInmb : nameImbCurrent,
          }
        })
      );

      return rentalsProperties
    } catch (error) {
      console.error('Error en el scraping:', error);
    } finally {
      await browser.close();
    }
  },
};

module.exports = scrapActions;
