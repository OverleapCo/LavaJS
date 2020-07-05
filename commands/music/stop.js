const { sm } = require('../../utils');

module.exports = {
	name: 'stop',
	description: 'Stop the music session',
	run: async (bot, message) => {
		const player = await bot.music.playerCollection.get(message.guild.id);
		if (!player)
			return await message.channel.send(sm.error('No players in this server!'));

		await player.destroy();
		await message.channel.send(
			sm.success(`Left voice channel. Hope you enjoyed!`)
		);
	}
};
