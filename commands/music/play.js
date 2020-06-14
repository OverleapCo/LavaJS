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
      skipOnError: false,
    });

    const track = await player.lavaSearch(song, message.member, true);
    await player.node.wsSend({
      op: "play",
      track: track.trackString,
      guildId: player.options.guild.id,
      volume: player.volume,
    });
  },
};
