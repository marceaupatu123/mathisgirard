const fs = require("fs")
const Discord = require("discord.js")

exports.run = (client, message, args) => {
// Check args
  if (!args[0])
    return message.channel
      .send(
        "**⚠️ Vérifier votre commande `reports [phrase]` ⚠️** "
      )
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
const phrase = args.slice(0).join(" ");
const tocheck = JSON.parse(fs.readFileSync("./json/report.json", "utf-8"))
 // check if exist 
 if (!tocheck[message.guild.id])
 return message.channel
   .send(
     "**⚠️ Veuillez setup le salon reports avec la commande `setup report [channel]`⚠️** "
   )
   .then((msg) => {
     message.delete({ timeout: 300 });
     msg.delete({ timeout: 5000 });
   });
const reportschannel = message.guild.channels.cache.get(tocheck[message.guild.id].reportchan)
const guildavatar = message.guild.iconURL({ format: "png" });

// Check if in DM
  if (message.channel.type == "dm")
    return message.channel
      .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });

  // Make embed
    const embed = new Discord.MessageEmbed()
      .setTitle(`Report de de ${message.author.tag}`)
      .setAuthor(
        message.author.username,
        message.author.avatarURL({ format: "png" })
      )
      .setColor("RED")
      .setDescription(phrase)
      .setFooter("Tout report abusif sera sanctionnée", guildavatar)
      .setTimestamp();
      reportschannel.send(embed)
      return message.channel.send("**Votre plainte à été envoyé avec succès ✅** ").then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
    };

module.exports.help = {
  name: "report",
  description: "Fait un report aux modorateurs",
};
