const { sm } = require('../../utils');

module.exports = {
	name: 'pause',
	description: 'Pause the song',
	run: async (bot, message) => {
		const player = await bot.music.playerCollection.get(message.guild.id);
		if (!player)
			return await message.channel.send(sm.error('No players in this server!'));

		if (!player.playing)
			return await message.channel.send(
				sm.error('No songs are being played right now!')
			);

		if (!player.paused) await player.pause();
		await message.channel.send(
			sm.success(`Pause set to: \`${player.paused}\`!`)
		);
	}
};
