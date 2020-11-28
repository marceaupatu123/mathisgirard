exports.run = (client, message, args) => {
  const Discord = require("discord.js");
  const functiontools = require("../main");
  const type = args[0].toLowerCase();
  const qui = functiontools.getUserFromMention(args[1]);
  const phrase = args.slice(2).join(" ");
  const guildavatar = message.guild.iconURL({}) // Need to be fixed
  const author = message.author.username

  // Check variable
  if (!type) {
    message.channel.send("Veuillez spécifier un type de conseil.");
    return;
  } else if (qui == undefined) {
    message.channel.send("Je ne trouve pas l'utilisateur");
    return;
  } else if (qui == false) {
    message.channel.send("Veuillez spécifier un destinataire");
    return;
  } else if (!phrase) {
    message.channel.send("Veuillez spécifier une phrase");
  }

  if (type == "cmpc") {
    const embed = new Discord.MessageEmbed()
      .setTitle(`Lettre de ${author}`)
      .setAuthor(
        "Cour de Modération Pénal et Civique ",
        "https://dzcharikati.net/wp-content/uploads/2019/08/scales-of-justice-logo.jpg"
      )
      .setColor(0x00ae86)
      .setDescription(phrase)
      .setFooter(
        "Vous disposez de 48h pour demander un recours ",
        guildavatar
      )
      .setThumbnail(guildavatar)
      .setTimestamp();
    qui.send(embed);
  }
};

module.exports.help = {
  name: "conseil",
  description: "",
};
