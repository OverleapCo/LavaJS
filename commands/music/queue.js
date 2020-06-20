const { sm, formatTime, embed } = require("../../utils");

module.exports = {
  name: "queue",
  description: "The current queue",
  run: async (bot, message) => {
    const player = await bot.music.playerCollection.get(message.guild.id);
    if (!player)
      return await message.channel.send(sm.error("No players in this server!"));

    const queue = new embed()
      .setTitle("Music Queue")
      .setDescription(
        [
          `Total number of tracks: ${player.queue.size}`,
          `Total duration: ${formatTime(player.queue.duration)}`,
        ].join("\n")
      );
    let data = "";

    for ([k, v] of player.queue.KVArray()) {
      const { title, length, uri } = v;
      data += `[${k}] [${title}](${uri}) - ${formatTime(length)}\n`;
    }

    await message.channel.send(queue.addField("Track List", data.trim()));
  },
};
