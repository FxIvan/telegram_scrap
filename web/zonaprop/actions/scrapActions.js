const puppeteer = require("puppeteer");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const scrapActions = {
  getScrap: async (url_zonaprop) => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
    });
    const page = await browser.newPage();

    try {
      await page.goto(url_zonaprop, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await delay(5000);
      await page.waitForSelector('div.CardContainer-sc-1tt2vbg-5');

      const rentalsProperties = await page.$$eval('div.CardContainer-sc-1tt2vbg-5', elements => 
        elements.map(el => {
          const priceElement = el.querySelector('div[data-qa="POSTING_CARD_PRICE"]');
          const nameInmb = el.querySelector('div.postingAddress');
          const linkTo = el.querySelector('div[data-qa="posting PROPERTY"]');
          const priceCurrent = priceElement ? priceElement.innerText : 'Precio no disponible';
          const nameImbCurrent = nameInmb ? nameInmb.innerHTML : "Nombre no disponible";
          
          // Obtener el valor del atributo data-to-posting
          const link = linkTo ? linkTo.getAttribute('data-to-posting') : "Link no disponible";

          return {
            price: priceCurrent,
            nameInmb: nameImbCurrent,
            link: `https://www.zonaprop.com.ar${link}`,
          };
        })
      );

      return rentalsProperties;
    } catch (error) {
      console.error('Error en el scraping:', error);
    } finally {
      await browser.close();
    }
  },
};

module.exports = scrapActions;
