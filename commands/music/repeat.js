const { sm } = require('../../utils');

module.exports = {
	name: 'repeat',
	description: 'Set repeat for track or queue or disable both',
	usage: `[track | queue]`,
	run: async (bot, message, args) => {
		const player = await bot.music.playerCollection.get(message.guild.id);
		if (!player)
			return await message.channel.send(sm.error('No players in this server!'));

		let state = args[0]
			? player.queue.toggleRepeat(args[0])
			: player.queue.toggleRepeat();

		await message.channel.send(
			sm.success(
				`${state ? 'Enabled' : 'Disabled'} repeat for ${args[0]
					? args[0]
					: 'both track and queue'}!`
			)
		);
	}
};
