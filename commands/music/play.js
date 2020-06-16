const { sm, formatTime } = require("../../utils");

module.exports = {
  name: "play",
  description: "Play a song",
  usage: "<Song Name>",
  run: async (bot, message, args) => {
    const song = args.join(" ");

    const player = await bot.music.spawnPlayer(bot.music, {
      guild: message.guild,
      voiceChannel: message.member.voice.channel,
      textChannel: message.channel,
      deafen: true,
      trackRepeat: false,
      queueRepeat: false,
      skipOnError: true,
    });

    let res;
    try {
      res = await player.lavaSearch(song, message.member, false);
    } catch (e) {
      if (e)
        return await message.channel.send(
          sm.error("No songs found. Please try again!")
        );
    }

    if (Array.isArray(res)) {
      player.queue.add(res[0]);
      await message.channel.send(
        sm.success(
          [
            `Track added to queue!`,
            `- Name: [${res.title}](${res.uri})`,
            `- Duration: ${formatTime(res.length)}`,
          ].join("\n")
        )
      );
    } else if (res.trackString) {
      await player.queue.add(res);
      await message.channel.send(
        sm.success(
          [
            `Track added to queue!`,
            `- Name: [${res.title}](${res.uri})`,
            `- Duration: ${formatTime(res.length)}`,
          ].join("\n")
        )
      );
    } else {
      await player.queue.add(res);
      await message.channel.send(
        sm.success(
          [
            `Playlist added to queue!`,
            `- Name: ${res.name}`,
            `- Tracks: ${res.trackCount}`,
            `- Duration: ${formatTime(res.duration)}`,
          ].join("\n")
        )
      );
    }

    if (!player.playing) await player.play();
  },
};
