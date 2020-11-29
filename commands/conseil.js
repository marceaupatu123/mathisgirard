exports.run = (client, message, args) => {
  const Discord = require("discord.js");
  const functiontools = require("../main");
  const type = args[0].toLowerCase();
  const qui =
    functiontools.getUserFromMention(args[1], message) ||
    functiontools.getChannelFromMention(args[1]) ||
    message.mentions.members.first() 
  const phrase = args.slice(2).join(" ");
  const guildavatar = message.guild.iconURL({ format: "png" });
  const author = message.author.username;

  // Check variable
  if (!type) {
    message.channel
      .send("**⚠️ Veuillez spécifier un type de conseil ⚠️** ")
      .then(setTimeout(() => message.channel.bulkDelete(1), 5000));
    return;
  } else if (qui == undefined) {
    message.channel
      .send("**⚠️ Je ne trouve pas l'utilisateur ou le salon ⚠️**")
      .then(setTimeout(() => message.channel.bulkDelete(1), 5000));
    return;
  } else if (qui == false) {
    message.channel
      .send("**⚠️ Veuillez spécifier un destinataire ⚠️**")
      .then(setTimeout(() => message.channel.bulkDelete(1), 5000));
    return;
  } else if (!phrase) {
    message.channel
      .send("**⚠️  Veuillez spécifier une phrase ⚠️**")
      .then(setTimeout(() => message.channel.bulkDelete(1), 5000));
    return;
  }

  if (type == "cmpc") {
    if (!message.member.roles.cache.has("770665806853308426")) {
      message.channel
        .send("**Tu n'as pas la permission de faire ça** ⛔️ ")
        .then(setTimeout(() => message.channel.bulkDelete(1), 5000));
    }
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
    if (!message.member.roles.cache.has("770995381038350366")) {
      message.channel
        .send("**Tu n'as pas la permission de faire ça ⛔️**")
        .then(setTimeout(() => message.channel.bulkDelete(1), 5000));
    }
    const embed = new Discord.MessageEmbed()
      .setTitle(`Lettre de ${author}`)
      .setAuthor(
        "Conseil Overabused",
        "https://eacea.ec.europa.eu/sites/eacea-site/files/flag_2colors.png"
      )
      .setColor("BLACK")
      .setDescription(phrase)
      .setFooter("Vous disposez de 48h pour demander un recours", guildavatar)
      .setTimestamp();
    qui.send(embed);
  } else if (type == "cr") {
    if (!message.member.roles.cache.has("777185655721033760")) {
      message.channel
        .send("**Tu n'as pas la permission de faire ça ⛔️**")
        .then(setTimeout(() => message.channel.bulkDelete(1), 5000));
    }
    const embed = new Discord.MessageEmbed()
      .setTitle(`Lettre de ${author}`)
      .setAuthor(
        "Conseil Républicain",
        "https://static.elysee.fr/images/default/0001/02/310d3dc879953b7e758fa4376d2366f21ee863e9.jpeg?w=300&h=400&crop=723,963,266,387&s=c82faa0b6fcb53e06501cd07b77812941d89581304399030e45353ddcf0428f8"
      )
      .setColor("PURPLE")
      .setDescription(phrase)
      .setFooter("Vous ne pouvez pas avoir de recours", guildavatar)
      .setTimestamp();
    qui.send(embed);
  } else {
    message.channel
      .send(
        "⚠️ Type de conseil invalide, ceux qui sont disponibles sont : **cmpc**, **cr**, **co** ⚠️ "
      )
      .then(setTimeout(() => message.channel.bulkDelete(1), 5000));
  }
  message.channel
    .send("Ton message a été envoyé 📬")
    .then(setTimeout(() => message.channel.bulkDelete(1), 5000));

  message.delete();
};

module.exports.help = {
  name: "conseil",
  description: "",
};
