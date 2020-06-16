const { sm } = require("../../utils");

module.exports = {
  name: "next",
  description: "Play the next song",
  run: async (bot, message) => {
    const player = await bot.music.playerCollection.get(message.guild.id);
    if (!player)
      return await message.channel.send(sm.error("No players in this server!"));
    if (player.queue.size !== 1)
      return await message.channel.send(
        sm.error(`No more tracks in the queue!`)
      );
    if (player.queue[0].user !== message.member)
      return await message.channel.send(
        sm.error(
          `Sorry the track was added by ${player.queue[0].user} so only he can skip!`
        )
      );

    await player.play();
  },
};
