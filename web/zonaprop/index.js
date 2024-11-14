const { scrapActions } = require("./actions/index");
const TelegramBot = require("node-telegram-bot-api");

const TELEGRAM_TOKEN = "8097657593:AAH66i67oUP3devhgtq_Bo3vUrFWd4wHsCs";
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
const groupChatId = -1002396445267; // Reemplaza con el chatId de tu grupo

exports.zonaprop = async (req, res) => {
  try {
    console.log("# zonaprop #");
    const rentalsProperties = await scrapActions.getScrap();
    console.log("RENTALPROPERTIES: ", rentalsProperties);
    // Envía un mensaje al grupo
    const mensaje = "Aquí tienes las propiedades de alquiler: " + "Hola";
    // await bot.sendMessage(groupChatId, mensaje);

    bot.sendMessage(groupChatId, mensaje)

    // Para obtener el chatId del grupo al recibir un mensaje
    bot.on("message", (msg) => {
      const chatId = msg.chat.id;
      console.log("Chat ID:", chatId); // Verifica y guarda este ID si es del grupo
      bot.sendMessage(chatId, "Recibido tu mensaje");
    });

    res
      .status(200)
      .send(
        "Función zonaprop ejecutada y mensaje enviado al grupo correctamente"
      );
  } catch (error) {
    console.error("# ERROR: ", error);
    res.status(500).send("Error en la función zonaprop");
  }
};
