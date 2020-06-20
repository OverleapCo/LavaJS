const { sm } = require("../../utils");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Commands help",
  run: async (bot, message, args) => {
    const commands = bot.commands.keyArray().map((c) => `\`${c}\``);
    await message.channel.send(
      sm.success(`My commands:\n${commands.join(" | ")}`)
    );
  },
};
