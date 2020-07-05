const { formatTime } = require('./functions');
const { MessageEmbed } = require('discord.js');

module.exports = {
	sm: require('./embeds'),
	formatTime,
	embed: MessageEmbed
};
