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

    for (let i = 0; i < player.queue.size; i++) {
      const { title, length, uri } = player.queue[i];
      data += `[${i + 1}] [${title}](${uri}) - ${formatTime(length)}\n`;
    }

    await message.channel.send(queue.addField("Track List", data.trim()));
  },
};
