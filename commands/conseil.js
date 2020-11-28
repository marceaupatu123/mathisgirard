exports.run = (client, message, args) => {
  const funtiontools = require("../main")
  const type = args[0];
  const qui = functiontools.getUserFromMention(args[1]);
  const phrase = [...args].slice(2).join(" ");
};

module.exports.help = {
  name: "conseil",
};
