const { LavaClient } = require("../../../NPM/LavaJS/dist");
const { sm } = require("../utils");

module.exports = async (bot) => {
  await bot.user.setPresence({
    activity: {
      name: "Testing LavaJS",
      type: "PLAYING",
    },
  });

  const nodes = [
    {
      host: "localhost",
      port: 2333,
      password: "TeamX",
    },
  ];

  bot.music = new LavaClient(bot, nodes);
  bot.music.on("nodeSuccess", (node) =>
    console.log(`Node connected: ${node.options.host}`)
  );
  bot.music.on("nodeError", console.error);

  bot.music.on("trackPlay", (player, track) => {
    const { title, length, uri } = track;
    console.log(track);
    /*player.options.textChannel.send(
      sm.success(`Now playing [${title}](${uri}) - \`${length}\`!`)
    );*/
  });

  bot.music.on("queueOver", (player) => {
    player.options.textChannel.send(
      sm.success(`Your current queue has ended. Leaving voice channel!`)
    );
    player.destroy();
  });
};
