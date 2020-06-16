const { sm } = require("../../utils");

module.exports = {
  name: "resume",
  description: "Resume the song",
  run: async (bot, message) => {
    const player = await bot.music.playerCollection.get(message.guild.id);
    if (!player)
      return await message.channel.send(sm.error("No players in this server!"));

    if (!player.playing)
      return await message.channel.send(
        sm.error("Not playing any tracks right now!")
      );

    if (player.paused) await player.resume();
    await message.channel.send(
      sm.success(`Pause set to: \`${player.paused}\`!`)
    );
  },
};
