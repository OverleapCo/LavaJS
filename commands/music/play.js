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
    console.log(bot.music.playerCollection);

    player.destroy();
  },
};
