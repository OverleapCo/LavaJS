const { readdirSync } = require("fs");

module.exports = (bot) => {
  readdirSync(__dirname + "/../events/")
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      const event = require(__dirname + `/../events/${file}`);
      try {
        bot.on(file.split(".")[0], event.bind(null, bot));
        console.log(`${file} loaded!`);
      } catch (e) {
        console.log(`Error while loading ${file}: ${e}`);
      }
    });
};
