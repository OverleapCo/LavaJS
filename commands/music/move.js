const { sm } = require('../../utils');

module.exports = {
	name: 'move',
	description: 'Change channel of the player',
	usage: '<Channel ID | Name>',
	run: async (bot, message, args) => {
		const player = await bot.music.playerCollection.get(message.guild.id);
		if (!player)
			return await message.channel.send(sm.error('No players in this server!'));

		const newChannel =
			message.guild.channels.cache.get(args[0]) ||
			message.guilds.channels.cache.find(
				(c) => c.name.toLowerCase() === args.join(' ').toLowerCase()
			);
		if (!newChannel)
			return message.channel.send(
				sm.error('No channels found with the given info!')
			);

		player.movePlayer(newChannel);
		await message.channel.send(
			sm.success(`Player moved to channel ${newChannel.name}!`)
		);
	}
};
