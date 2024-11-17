module.exports = {
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN_BOT,
    URL_ZONAPROP: [
        "https://www.zonaprop.com.ar/departamentos-alquiler-q-quilmes.html",
        "https://www.zonaprop.com.ar/departamentos-alquiler-berazategui.html",
    ],
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PSW: process.env.MONGO_PSW,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_URI_DB: "mongodb+srv://" + process.env.MONGO_USER + ":" + encodeURIComponent(process.env.MONGO_PSW) + "@" + process.env.MONGO_URI
}