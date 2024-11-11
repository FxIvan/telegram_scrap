const { scrapActions } = require("./actions/index");

exports.zonaprop = async (req, res) => {
  try {
    console.log("# zonaprop #");
    await scrapActions.getScrap()
    res.status(200).send("Función zonaprop ejecutada correctamente");
  } catch (error) {
    console.error("# ERROR: ", error);
    res.status(500).send("Error en la función zonaprop");
  }
};