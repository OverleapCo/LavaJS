const { readdirSync } = require("fs");

module.exports = (bot) => {
  const categories = readdirSync(__dirname + "/../commands/");
  categories
    .filter((cat) => !cat.endsWith(".js"))
    .forEach((cat) => {
      const file = readdirSync(__dirname + `/../commands/${cat}/`).filter((f) =>
        f.endsWith(".js")
      );

      for (let i = 0; i < file.length; i++) {
        const command = require(__dirname + `/../commands/${cat}/${file[i]}`);
        if (!command.name) {
          console.log(`${file[i]} - No command name!`);
          continue;
        }
        bot.commands.set(command.name, command);
        console.log(`${command.name} loaded!`);
      }
    });
};
