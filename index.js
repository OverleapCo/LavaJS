const { Client, Collection } = require("discord.js");
const bot = new Client();
const { token } = require("./config.json");
bot.commands = new Collection();

["commands", "events"].forEach((handler) => {
  require(`./handlers/${handler}`)(bot);
});

bot.login(token).then(() => console.log(`${bot.user.username} is now online!`));
