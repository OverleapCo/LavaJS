const { sm } = require("../../utils");

module.exports = {
  name: "movetrack",
  description: "Change position of a track",
  usage: "<Old Position> <New Position>",
  run: async (bot, message, args) => {
    const player = await bot.music.playerCollection.get(message.guild.id);
    if (!player)
      return await message.channel.send(sm.error("No players in this server!"));

    const old = parseInt(args[0]);
    const to = parseInt(args[1]);

    player.queue.moveTrack(old, to);
    await message.channel.send(sm.success(`Track moved to new position!`));
  },
};
