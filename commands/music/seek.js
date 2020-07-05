const { sm } = require('../../utils');

module.exports = {
	name: 'seek',
	description: 'Seek the track',
	run: async (bot, message, args) => {
		const player = await bot.music.playerCollection.get(message.guild.id);
		if (!player)
			return await message.channel.send(sm.error('No players in this server!'));
		if (!player.playing)
			return await message.channel.send(
				sm.error('No songs are being played right now!')
			);

		if (
			isNaN(args[0]) ||
			parseInt(args[0]) > player.queue.first.length ||
			parseInt(args[0]) < 0
		)
			return message.channel.send(
				sm.error(
					`Volume must be a number and between 0 and ${player.queue.first
						.length}!`
				)
			);
		player.seek(parseInt(args[0]));

		await message.channel.send(sm.success(`Seeked the current track!`));
	}
};
