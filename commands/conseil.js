exports.run = (client, message, args) => {
  const Discord = require("discord.js");
  const functiontools = require("../main");
  const type = args[0].toLowerCase();
  const qui = functiontools.getUserFromMention(args[1]);
  const phrase = args.slice(2).join(" ");
  const guildavatar = message.guild.iconURL({ format: "png" });
  const author = message.author.username;

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
        "Cour de Modération Pénal et Civique",
        "https://dzcharikati.net/wp-content/uploads/2019/08/scales-of-justice-logo.jpg"
      )
      .setColor("ORANGE")
      .setDescription(phrase)
      .setFooter("Vous disposez de 48h pour demander un recours", guildavatar)
      .setTimestamp();
    qui.send(embed);
  } else if (type == "co") {
    const embed = new Discord.MessageEmbed()
      .setTitle(`Lettre de ${author}`)
      .setAuthor(
        "Conseil Overabused",
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/justice-rights-brand-logo-design-template-67ee25393ccca0209111f75188828e6d_screen.jpg"
      )
      .setColor("BLACK")
      .setDescription(phrase)
      .setFooter("Vous disposez de 48h pour demander un recours", guildavatar)
      .setTimestamp();
    qui.send(embed);
  } else if (type == "cr") {
    const embed = new Discord.MessageEmbed()
      .setTitle(`Lettre de ${author}`)
      .setAuthor(
        "Conseil Républicain",
        "https://static.elysee.fr/images/default/0001/02/310d3dc879953b7e758fa4376d2366f21ee863e9.jpeg"
      )
      .setColor("PURPLE")
      .setDescription(phrase)
      .setFooter("Vous ne pouvez pas avoir de recours", guildavatar)
      .setTimestamp();
    qui.send(embed);
  } else {
    message.channel.send(
      "Type de conseil invalide, ceux qui sont disponibles sont : **cmpc**, **cr**, **co**"
    );
  }
  message.delete({ timeout: 5000 });
};

module.exports.help = {
  name: "conseil",
  description: "",
};
