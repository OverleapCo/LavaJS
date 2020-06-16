const { prefix } = require("../config.json");

module.exports = (bot, message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift();
  const command = bot.commands.find(
    (c) =>
      c.name.toLowerCase() === cmd.toLowerCase() ||
      (c.aliases &&
        c.aliases.map((a) => a.toLowerCase()).includes(cmd.toLowerCase()))
  );
  if (!command) return;

  command.run(bot, message, args);
};
