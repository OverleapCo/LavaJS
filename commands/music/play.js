const { sm, formatTime } = require('../../utils');

module.exports = {
	name: 'play',
	description: 'Play a song',
	usage: '<Song Name>',
	run: async (bot, message, args) => {
		const { channel } = message.member.voice;
		if (!channel)
			return message.channel.send(
				sm.error(`You need to be in a voice channel!`)
			);
		const song = args.join(' ');
		const player = await bot.music.spawnPlayer(
			{
				guild: message.guild,
				voiceChannel: channel,
				textChannel: message.channel,
				volume: 80,
				deafen: true
			},
			{
				skipOnError: true
			}
		);

		let res;
		try {
			res = await player.lavaSearch(song, message.member, {
				source: 'yt',
				add: false
			});
		} catch (e) {
			if (e)
				return await message.channel.send(
					sm.error('No songs found. Please try again!')
				);
		}

		if (Array.isArray(res)) {
			player.queue.add(res[0]);
			await message.channel.send(
				sm.success(
					[
						`Track added to queue!`,
						`- Name: [${res[0].title}](${res[0].uri})`,
						`- Duration: ${formatTime(res[0].length)}`
					].join('\n')
				)
			);
		}
		else {
			await player.queue.add(res.tracks);
			await message.channel.send(
				sm.success(
					[
						`Playlist added to queue!`,
						`- Name: ${res.name}`,
						`- Tracks: ${res.trackCount}`,
						`- Duration: ${formatTime(res.duration)}`
					].join('\n')
				)
			);
		}

		if (!player.playing) await player.play();
	}
};
