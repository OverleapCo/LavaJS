const { MessageEmbed } = require("discord.js");

module.exports = {
  error: function (content) {
    return new MessageEmbed().setDescription(content).setColor("#f44336");
  },
  success: function (content) {
    return new MessageEmbed().setDescription(content).setColor("#4caf50");
  },
  embed: new MessageEmbed(),
};
