const puppeteer = require("puppeteer");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const scrapActions = ({ dbHandler }) => ({
  getScrap: async ({ url }) => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
    });
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await delay(5000);
      await page.waitForSelector("div.CardContainer-sc-1tt2vbg-5");

      const existInDB = async(url_scrap) => {
        if (await dbHandler.findByURL(url_scrap)) return true;
        await dbHandler.createdURL(url_scrap);
        return false;
      };

      const rentalsProperties = await page.$$eval(
        "div.CardContainer-sc-1tt2vbg-5",
        (elements) =>
          elements.map((el) => {
            const priceElement = el.querySelector(
              'div[data-qa="POSTING_CARD_PRICE"]'
            );
            const nameInmb = el.querySelector("div.postingAddress");
            const linkTo = el.querySelector('div[data-qa="posting PROPERTY"]');
            const priceCurrent = priceElement
              ? priceElement.innerText
              : "Precio no disponible";
            const nameImbCurrent = nameInmb
              ? nameInmb.innerHTML
              : "Nombre no disponible";

            // Obtener el valor del atributo data-to-posting
            const link = linkTo
              ? linkTo.getAttribute("data-to-posting")
              : "Link no disponible";

            return {
              price: priceCurrent,
              nameInmb: nameImbCurrent,
              link: `https://www.zonaprop.com.ar${link}`,
            };
          })
      );

      const clearDataDuplicatedInDB = async (_rentalsProperties) => {
        const result = [];
        for (const property of _rentalsProperties) {
          if (!(await existInDB(property.link))) result.push(property);
        }
        return result;
      };
      return clearDataDuplicatedInDB(rentalsProperties);
    } catch (error) {
      console.error("Error en el scraping:", error);
    } finally {
      await browser.close();
    }
  },
});

module.exports = scrapActions;
