const { sm } = require("../../utils");

module.exports = {
  name: "seteq",
  description: "Set equaliser bands for the player",
  usage: `<Band> <Gain>`,
  run: async (bot, message, [band, gain, ...args]) => {
    const player = await bot.music.playerCollection.get(message.guild.id);
    if (!player)
      return await message.channel.send(sm.error("No players in this server!"));

    if (isNaN(band) || isNaN(gain)) {
      player.EQBands();
      return message.channel.send(
        sm.success(`The equaliser for the player has been reset!`)
      );
    }

    if (parseInt(band) > 14 || parseInt(band) < 0)
      return await message.channel.send(
        sm.error("The band should be between 0 and 14!")
      );
    if (parseFloat(gain) < -0.25 || parseFloat(gain) > 1)
      return await message.channel.send(
        sm.error("The gain should be between -0.25 and 1!")
      );

    player.EQBands(parseInt(band), parseFloat(gain));

    await message.channel.send(
      sm.success(`Gain for band \`${band}\` set to \`${gain}\`!`)
    );
  },
};
