const { scrapActions } = require("./actions/index");
const TelegramBot = require("node-telegram-bot-api");
const { TELEGRAM_TOKEN, URL_ZONAPROP } = require("./config");
const messageBot = require("../../functions/messageBot");

const bot = new TelegramBot(TELEGRAM_TOKEN, {
  polling: true,
  request: {
    agentOptions: {
      keepAlive: true,
      family: 4
    }
  }

});
const groupChatId = -1002396445267; // Reemplaza con el chatId de tu grupo

exports.zonaprop = async (req, res) => {
  try {
    console.log("# zonaprop #");
    URL_ZONAPROP.map(async (url) => {
      const rentalsProperties = await scrapActions.getScrap({ url });
      async function sendMessagesWithDelay(rentalsProperties) {
        for (const property of rentalsProperties.slice(0, 1)) {
          const message = messageBot(
            property.nameInmb,
            property.price,
            property.link,
            "ZonaProp"
          );

          await bot.sendMessage(groupChatId, message, {
            parse_mode: "Markdown",
          });

          // Esperar 5 segundos antes de enviar el siguiente mensaje
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }

      // Llamar a la función
      sendMessagesWithDelay(rentalsProperties);

      bot.on("message", (msg) => {
        const chatId = msg.chat.id;
        console.log("Chat ID:", chatId);
        bot.sendMessage(chatId, "Recibido tu mensaje");
      });

      res
        .status(200)
        .send(
          "Función zonaprop ejecutada y mensaje enviado al grupo correctamente"
        );
    });
  } catch (error) {
    console.error("# ERROR: ", error);
    res.status(500).send("Error en la función zonaprop");
  }
};
