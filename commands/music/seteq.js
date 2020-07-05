const { sm } = require('../../utils');

module.exports = {
	name: 'seteq',
	description: 'Set equaliser bands for the player',
	usage: `--band1 gain1 --band2 gain2`,
	run: async (bot, message, args) => {
		const player = await bot.music.playerCollection.get(message.guild.id);
		if (!player)
			return await message.channel.send(sm.error('No players in this server!'));

		let entries = args.join(' ').split('--');
		entries.shift();
		let equaliser = [];

		for (let eq of entries) {
			[ band, gain ] = eq.trim().split(/ +/g);

			if (isNaN(band) || isNaN(gain)) continue;
			if (parseInt(band) > 14 || parseInt(band) < 0)
				return await message.channel.send(
					sm.error('The band should be between 0 and 14!')
				);
			if (parseFloat(gain) < -0.25 || parseFloat(gain) > 1)
				return await message.channel.send(
					sm.error('The gain should be between -0.25 and 1!')
				);

			equaliser.push({ band: parseInt(band), gain: parseFloat(gain) });
		}

		equaliser.length ? player.EQBands(equaliser) : player.EQBands();

		await message.channel.send(
			sm.success(`Equaliser bands updated for the player!`)
		);
	}
};
