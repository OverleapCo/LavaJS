const { LavaClient } = require("@anonymousg/lavajs");
const { sm, formatTime } = require("../utils");
const { nodes } = require("../config.json");

module.exports = async (bot) => {
  await bot.user.setPresence({
    activity: {
      name: "Testing LavaJS",
      type: "PLAYING",
    },
  });

  bot.music = new LavaClient(bot, nodes);
  bot.music.on("nodeSuccess", (node) =>
    console.log(`Node connected: ${node.options.host}`)
  );
  bot.music.on("nodeError", console.error);

  bot.music.on("trackPlay", (track, player) => {
    const { title, length, uri, thumbnail, user } = track;
    player.options.textChannel.send(
      sm.embed
        .setAuthor("New Track Playing")
        .setTitle(`${title}`)
        .setDescription(
          `Requested by ${user}. Track length: ${formatTime(length)}`
        )
        .setURL(uri)
        .setImage(thumbnail.medium)
        .setColor("RANDOM")
    );
  });

  bot.music.on("queueOver", (player) => {
    player.options.textChannel.send(
      sm.success(`Your current queue has ended. Leaving voice channel!`)
    );
    player.destroy();
  });
};
