exports.run = (client, message, args) => {
  const functiontools = require("../main")
  const type = args[0]
  const qui = functiontools.getUserFromMention(args[1])
  const phrase = args.slice(2).join(" ");

  if (!qui) {
    message.channel.send("Je ne trouve pas l'utilisateur")
   return;
  }

  console.log("c bon")
};




module.exports.help = {
  name: "conseil",
};
