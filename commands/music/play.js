module.exports = {
  name: "play",
  description: "Play a song",
  usage: "<Song Name>",
  run: async (message, args) => {
    const song = args.join(" ");
  },
};
