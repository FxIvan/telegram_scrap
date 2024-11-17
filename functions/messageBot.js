const messageBot = (nombrePropiedad, precio, link, web) => {
  return (
    `***Nombre:*** ${nombrePropiedad} \n` +
    `***Precio:*** ${precio} \n` +
    `[Link a la propiedad](${link}) \n` +
    `***Publicada en:*** ${web}`
  );
};

module.exports = messageBot;