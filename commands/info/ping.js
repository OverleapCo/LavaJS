const { sm } = require('../../utils');

module.exports = {
	name: 'ping',
	aliases: [ 'pong' ],
	description: 'Get WebSocket ping',
	run: async (bot, message) => {
		await message.channel.send(
			sm.success(`My current ping is \`${bot.ws.ping}\`!`)
		);
	}
};
