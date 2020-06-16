const { sm } = require("../../utils");

module.exports = {
  name: "volume",
  description: "Change volume of the song",
  run: async (bot, message, args) => {
    const player = await bot.music.playerCollection.get(message.guild.id);
    if (!player)
      return await message.channel.send(sm.error("No players in this server!"));

    if (!player.playing) return;

    if (isNaN(args[0]) || parseInt(args[0]) > 1000 || parseInt(args[0]) < 0)
      return message.channel.send(
        sm.error(`Volume must be a number and between 0 and 1000!`)
      );
    player.setVolume(parseInt(args[0]));

    await message.channel.send(
      sm.success(`Volume set to: \`${player.volume}\`!`)
    );
  },
};
